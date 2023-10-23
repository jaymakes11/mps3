import { JSONArrayless, JSONArraylessObject, merge } from "json";
import { Manifest } from "manifest";
import { clone } from "json";
import { JSONValue } from "json";
import * as time from "time";
import { UseStore, get, set } from "idb-keyval";
import {
  DeleteValue,
  ResolvedRef,
  VersionId,
  countKey,
  url,
  uuid,
} from "types";

interface FileState extends JSONArraylessObject {
  version: string;
}

type Merge = any;

export interface ManifestFile extends JSONArraylessObject {
  previous: string; // key of previous snapshot this change was based on
  files: {
    [url: string]: FileState;
  };
  // JSON-merge-patch update that *this* operation was, the files do not include this
  update: Merge;
}
const MANIFEST_KEY = "manifest";
const INITIAL_STATE: ManifestFile & JSONValue = {
  previous: ".",
  files: {},
  update: {},
};

interface HttpCacheEntry<T> {
  etag: string;
  data: T;
}

export class Syncer {
  session_id = uuid().substring(0, 3);
  latest_key: string = "";
  latest_state: ManifestFile = clone(INITIAL_STATE);

  loading?: Promise<unknown>;
  cache?: HttpCacheEntry<ManifestFile>;
  db?: UseStore;

  latest_timestamp = 0;
  writes = 0;

  constructor(private manifest: Manifest) {}

  static manifestTimestamp = (key: string): number => {
    const match = key.match(/@([0-9]+)_[0-9a-f]+_[0-9a-z]+$/);
    if (!match) {
      console.warn(`Rejecting manifest key ${key}`);
      return 0;
    }
    return Number.parseInt(match[1]);
  };

  static isValid(key: string, modified: Date): boolean {
    const match = key.match(/@([0-9]+)_[0-9a-f]+_[0-9a-z]+$/);
    if (!match) {
      console.warn(`Rejecting manifest key ${key}`);
      return false;
    }
    if (modified === undefined) return true;
    const manifestTimestamp = Number.parseInt(match[1]);
    const s3Timestamp = modified;
    // if the difference is greater than 5 seconds, ignore this update
    const withinRange =
      Math.abs(manifestTimestamp - s3Timestamp.getTime()) < 5000;
    if (!withinRange) {
      console.warn(`Clock skew detected ${key} vs ${s3Timestamp.getTime()}`);
    }
    return withinRange;
  }

  async restore(db: UseStore) {
    this.db = db;
    this.loading = get(MANIFEST_KEY, db).then((loaded) => {
      if (loaded) {
        this.latest_state = loaded;
        this.manifest.service.config.log(`RESTORE ${MANIFEST_KEY}`);
      }
    });
  }

  async getLatest(): Promise<ManifestFile> {
    if (this.loading) await this.loading;
    this.loading = undefined;

    if (!this.manifest.service.config.online) {
      return this.latest_state;
    }
    try {
      const poll = await this.manifest.service._getObject<string>({
        operation: "POLL_TIME",
        ref: this.manifest.ref,
        ifNoneMatch: this.cache?.etag,
        useCache: false,
      });
      if (poll.$metadata.httpStatusCode === 304) {
        return this.latest_state;
      }

      if (poll.data === undefined) {
        this.latest_key = "."; // before digits
      } else {
        this.latest_key = poll.data;
      }

      const [objects, dt] = await time.measure(
        this.manifest.service.s3ClientLite.listObjectV2({
          Bucket: this.manifest.ref.bucket,
          Prefix: this.manifest.ref.key,
          StartAfter: this.latest_key, // could be null
        })
      );

      // prune invalid objects
      const manifests = objects.Contents?.filter((obj) => {
        if (obj.Key === this.manifest.ref.key) return false;
        if (!Syncer.isValid(obj.Key!, obj.LastModified!)) {
          if (this.manifest.service.config.autoclean) {
            this.manifest.service._deleteObject({
              operation: "CLEANUP",
              ref: {
                bucket: this.manifest.ref.bucket,
                key: obj.Key!,
              },
            });
          }
          return false;
        }
        return true;
      });

      this.manifest.service.config.log(
        `${dt}ms LIST ${this.manifest.ref.bucket}/${this.manifest.ref.key}`
      );

      // Play the missing patches over the base state, oldest first
      if (manifests === undefined) {
        this.latest_state = clone(INITIAL_STATE);
        return this.latest_state;
      }

      // Go back a little before the latest key to accommodate writes in flight
      const settledPoint = `${this.manifest.ref.key}@${Math.max(
        Syncer.manifestTimestamp(this.latest_key) - 5000,
        0
      )
        .toString()
        .padStart(14, "0")}`;

      // Keep a record of the high water mark so we can ensure latest writes increment it.
      this.latest_timestamp = Math.max(
        this.latest_timestamp,
        Syncer.manifestTimestamp(this.latest_key)
      );

      // Find the most recent patch, whose base state is settled, and that we have a record for
      let loadedFirst = false;
      for (let index = manifests.length - 1; index >= 0; index--) {
        const key = manifests[index].Key!;
        const ref = {
          bucket: this.manifest.ref.bucket,
          key,
        };
        const step = await this.manifest.service._getObject<ManifestFile>({
          operation: "LOOK_BACK",
          ref,
        });

        if (step.data === undefined) {
          if (this.manifest.service.config.autoclean) {
            this.manifest.service._deleteObject({
              operation: "CLEANUP",
              ref,
            });
          }
          continue;
        } else if (loadedFirst === false) {
          this.latest_state = step.data;
          this.latest_key = key;
          loadedFirst = true;
        }
      }

      // Play operations forward on oldest state
      for (let index = 0; index < manifests.length; index++) {
        const key = manifests[index].Key!;
        if (key < this.latest_key && key < settledPoint) {
          // Its old we can skip and GC asyncronously
          if (this.manifest.service.config.autoclean) {
            this.manifest.service._deleteObject({
              operation: "CLEANUP",
              ref: {
                bucket: this.manifest.ref.bucket,
                key,
              },
            });
          }
          continue;
        }

        // this.manifest.service.config(`step ${key} from ${this.authoritative_key}`);
        const step = await this.manifest.service._getObject<ManifestFile>({
          operation: "SWEEP",
          ref: {
            bucket: this.manifest.ref.bucket,
            key,
          },
        });
        const stepVersionid = key.substring(key.lastIndexOf("@") + 1);
        this.latest_state = merge<ManifestFile>(
          this.latest_state,
          step.data?.update
        )!;
        this.manifest.observeVersionId(stepVersionid);
      }
      if (this.db) set(MANIFEST_KEY, this.latest_state, this.db);

      return this.latest_state;
    } catch (err: any) {
      if (err.name === "NoSuchKey") {
        this.latest_state = INITIAL_STATE;
        return this.latest_state;
      } else {
        throw err;
      }
    }
  }

  updateContent(
    values: Map<ResolvedRef, JSONValue | DeleteValue>,
    write: Promise<Map<ResolvedRef, VersionId | DeleteValue>>,
    options: {
      await: "local" | "remote";
      isLoad: boolean;
    }
  ): Promise<unknown> {
    // Manifest must be ordered by client operation time
    // (An exception is made for adjusting for clock skew)
    const generate_manifest_key = () =>
      time.timestamp(
        Math.max(
          Date.now() + this.manifest.service.config.clockOffset,
          this.latest_timestamp
        )
      ) +
      "_" +
      this.session_id +
      "_" +
      countKey(this.writes++);

    let manifest_version = generate_manifest_key();

    const localPersistence = this.manifest.operationQueue.propose(
      write,
      values,
      options.isLoad
    );
    const remotePersistency = localPersistence.then(async () => {
      try {
        const update = await write;
        let response,
          manifest_key,
          retry = false;
        do {
          const state = await this.getLatest();
          state.previous = this.latest_key;
          state.update = {
            files: {},
          };

          for (let [ref, version] of update) {
            const fileUrl = url(ref);
            if (version) {
              const fileState = {
                version: version,
              };
              state.update.files[fileUrl] = fileState;
            } else {
              state.update.files[fileUrl] = null;
            }
          }
          // put versioned write
          manifest_key = this.manifest.ref.key + "@" + manifest_version;
          this.manifest.operationQueue.label(
            write,
            manifest_version,
            options.isLoad
          );

          const putResponse = await this.manifest.service._putObject({
            operation: "PUT_MANIFEST",
            ref: {
              key: manifest_key,
              bucket: this.manifest.ref.bucket,
            },
            value: state,
          });

          // Check the response leads to a valid write.
          if (
            this.manifest.service.config.adaptiveClock &&
            !Syncer.isValid(manifest_key, putResponse.Date)
          ) {
            this.manifest.service.config.clockOffset =
              putResponse.Date.getTime() - Date.now() + putResponse.latency;
            console.log(this.manifest.service.config.clockOffset);
            manifest_version = generate_manifest_key();
            retry = true;
          } else {
            retry = false;
          }
        } while (retry);

        // update poller with write to known location
        response = await this.manifest.service._putObject({
          operation: "PUT_POLL",
          ref: {
            key: this.manifest.ref.key,
            bucket: this.manifest.ref.bucket,
          },
          value: this.latest_key, // indicates how far we need to look back
        });

        this.manifest.poll();
        return response;
      } catch (err) {
        console.error(err);
        this.manifest.operationQueue.cancel(write, options.isLoad);
        throw err;
      }
    });
    if (options.await === "local") {
      return localPersistence;
    } else {
      return remotePersistency;
    }
  }
}
