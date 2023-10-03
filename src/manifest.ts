import { OMap } from "OMap";
import { MPS3 } from "mps3";
import * as time from "time";
import { OperationQueue } from "operationQueue";
import {
  DeleteValue,
  JSONValue,
  ResolvedRef,
  VersionId,
  clone,
  url,
  uuid,
} from "types";
import { apply } from "json";
import { UseStore } from "idb-keyval";

interface FileState {
  version: string;
}

type Merge = any;

export interface ManifestState {
  previous: string; // key of previous snapshot this change was based on
  files: {
    [url: string]: FileState;
  };
  // JSON-merge-patch update that *this* operation was, the files do not include this
  update: Merge;
}

const INITIAL_STATE: ManifestState & JSONValue = {
  previous: ".",
  files: {},
  update: {},
};

interface HttpCacheEntry<T> {
  etag: string;
  data: T;
}

class Subscriber {
  queue = Promise.resolve();

  constructor(
    public ref: ResolvedRef,
    public handler: (value: JSONValue | DeleteValue) => void,
    public lastVersion?: VersionId
  ) {}

  notify(
    label: string,
    version: VersionId | undefined,
    content: Promise<JSONValue | DeleteValue>
  ) {
    this.queue = this.queue
      .then(() => content)
      .then((response) => {
        if (version !== this.lastVersion) {
          console.log(`${label} NOTIFY ${url(this.ref)} ${version}`);
          this.lastVersion = version;
          this.handler(response);
        }
      });
  }
}

export class Manifest {
  subscribers = new Set<Subscriber>();
  poller?: Timer;
  cache?: HttpCacheEntry<ManifestState>;
  pollInProgress: boolean = false;

  authoritative_key: string = "";
  authoritative_state = clone(INITIAL_STATE);
  optimistic_state = clone(INITIAL_STATE);

  operation_queue = new OperationQueue();

  constructor(
    public service: MPS3,
    public ref: ResolvedRef
  ) {
    console.log("Create manifest", url(ref));
  }
  load(db: UseStore) {
    console.log("Restoring manifest from disk");
    this.operation_queue.restore(
      db,
      async (
        values: Map<ResolvedRef, JSONValue | DeleteValue>,
        label?: string
      ) => {
        if (!label) {
          // this write has not been attempted at all
          // we do a write from scratch
          this.service._putAll(values, {
            manifests: [this.ref],
          });
        } else {
          // the content was uploaded, but we don't know if the manifest was
          // so we do a manifest write
          this.updateContent(
            values,
            Promise.resolve(
              new Map<ResolvedRef, VersionId>([[this.ref, label]])
            )
          );
        }
      }
    );

  }
  observeVersionId(versionId: VersionId) {
    this.operation_queue.confirm(versionId);
  }

  async get(): Promise<ManifestState> {
    return this.getLatest().then((state) => state || this.cache?.data!);
  }

  async getLatest(): Promise<ManifestState | undefined> {
    try {
      const poll = await this.service._getObject<string>({
        operation: "POLL_TIME",
        ref: this.ref,
        ifNoneMatch: this.cache?.etag,
      });
      if (poll.$metadata.httpStatusCode === 304) {
        return undefined;
      }

      if (poll.data === undefined) {
        this.authoritative_key = "."; // before digits
      } else {
        this.authoritative_key = poll.data;
      }

      const objects = await this.service.s3ClientLite.listObjectV2({
        Bucket: this.ref.bucket,
        Prefix: this.ref.key,
        StartAfter: this.authoritative_key,
      });

      // Play the missing patches over the base state, oldest first
      if (objects.Contents === undefined) {
        this.authoritative_state = clone(INITIAL_STATE);
        this.optimistic_state = clone(INITIAL_STATE);
        return this.authoritative_state;
      }

      const settledPoint = `${this.ref.key}@${time.lowerTimeBound()}`;

      // Find the most recent patch, whose base state is settled, and that we have a record for
      for (let index = objects.Contents.length - 1; index >= 0; index--) {
        const key = objects.Contents[index].Key!;
        if (key == this.ref.key) continue; // skip manifest read
        const ref = {
          bucket: this.ref.bucket,
          key,
        };
        const step = await this.service._getObject<ManifestState>({
          operation: "LOOK_BACK",
          ref,
        });

        if (step.data === undefined) {
          await this.service._deleteObject({
            operation: "CLEANUP",
            ref,
          });
          continue;
        }
        if (step.data.previous < settledPoint) {
          this.authoritative_key = step.data.previous;
          this.authoritative_state = step.data;
          break;
        }
      }

      for (let index = 0; index < objects.Contents.length; index++) {
        const key = objects.Contents[index].Key!;
        if (key == this.ref.key) continue; // skip manifest read
        if (key < this.authoritative_key) {
          // Its old we can skip
          continue;
        }

        // console.log(`step ${key} from ${this.authoritative_key}`);
        const step = await this.service._getObject<ManifestState>({
          operation: "SWEEP",
          ref: {
            bucket: this.ref.bucket,
            key,
          },
        });
        const stepVersionid = key.substring(key.lastIndexOf("@") + 1);

        if (stepVersionid >= settledPoint) {
          console.log("Optimistic update");
          this.optimistic_state = apply(
            this.optimistic_state,
            step.data?.update
          );
          // we cannot replay state into the inflight zone, its not authorative yet
        } else {
          // console.log("settled update");
          this.authoritative_state = apply(
            this.authoritative_state,
            step.data?.update
          );
          this.optimistic_state = apply(
            this.optimistic_state,
            step.data?.update
          );
          this.authoritative_key = key;
        }
        this.observeVersionId(stepVersionid);
      }

      return this.authoritative_state;
    } catch (err: any) {
      if (err.name === "NoSuchKey") {
        this.authoritative_state = INITIAL_STATE;
        return this.authoritative_state;
      } else {
        throw err;
      }
    }
  }

  async poll() {
    if (this.pollInProgress) return;
    this.pollInProgress = true;

    if (this.subscriberCount === 0 && this.poller) {
      clearInterval(this.poller);
      this.poller = undefined;
    }
    if (this.subscriberCount > 0 && !this.poller) {
      this.poller = setInterval(
        () => this.poll(),
        this.service.config.pollFrequency
      );
    }

    const state = await this.getLatest();

    if (state === undefined) {
      this.pollInProgress = false;
      return; // no changes
    }

    // calculate which values are set by optimistic updates
    const mask: OMap<ResolvedRef, JSONValue | DeleteValue> =
      this.operation_queue.flatten();

    this.subscribers.forEach(async (subscriber) => {
      if (mask.has(subscriber.ref)) {
        // console.log("mask", url(subscriber.ref));
        subscriber.notify(
          this.service.config.label,
          "local",
          Promise.resolve(mask.get(subscriber.ref))
        );
      } else {
        const fileState: FileState | null | undefined =
          state.files[url(subscriber.ref)];
        if (fileState) {
          const content = this.service._getObject<any>({
            operation: "GET_CONTENT",
            ref: subscriber.ref,
            version: fileState.version,
          });
          subscriber.notify(
            this.service.config.label,
            fileState.version,
            content.then((res) => res.data)
          );
        } else if (fileState === null) {
          subscriber.notify(
            this.service.config.label,
            undefined,
            Promise.resolve(undefined)
          );
        }
      }
    });
    this.pollInProgress = false;
  }

  async updateContent(
    values: Map<ResolvedRef, JSONValue | DeleteValue>,
    write: Promise<Map<ResolvedRef, VersionId | DeleteValue>>
  ) {
    this.operation_queue.propose(write, values);
    try {
      const update = await write;
      const state = await this.get();
      state.previous = this.authoritative_key;
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
      const manifest_version =
        time.upperTimeBound() + "_" + uuid().substring(0, 2);
      const manifest_key = this.ref.key + "@" + manifest_version;
      this.operation_queue.label(write, manifest_version);

      await this.service._putObject({
        operation: "PUT_MANIFEST",
        ref: {
          key: manifest_key,
          bucket: this.ref.bucket,
        },
        value: state,
      });
      // update pollers with write to known location
      const response = await this.service._putObject({
        operation: "PUT_POLL",
        ref: {
          key: this.ref.key,
          bucket: this.ref.bucket,
        },
        value: this.authoritative_key, // indicates how far we need to look back
      });

      this.poll();
      return response;
    } catch (err) {
      console.error(err);
      this.operation_queue.cancel(write);
      throw err;
    }
  }

  async getOptimisticVersion(ref: ResolvedRef): Promise<string | undefined> {
    await this.get();
    return this.optimistic_state.files[url(ref)]?.version;
  }

  subscribe(
    keyRef: ResolvedRef,
    handler: (value: JSONValue | undefined) => void
  ): () => void {
    console.log(`SUBSCRIBE ${url(keyRef)} ${this.subscriberCount + 1}`);
    const sub = new Subscriber(keyRef, handler);
    this.subscribers.add(sub);
    return () => this.subscribers.delete(sub);
  }

  get subscriberCount(): number {
    return this.subscribers.size;
  }
}
