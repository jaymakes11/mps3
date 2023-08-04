import { S3 } from "@aws-sdk/client-s3";
import { expect, test, describe, beforeAll, beforeEach } from "bun:test";
import { MPS3 } from "mps3";

describe("mps3", () => {
  let s3: S3;
  beforeAll(async () => {
    s3 = new S3({
      region: "us-east-1",
      endpoint: "http://127.0.0.1:9102 ", // for docker, http://minio:9102
      credentials: {
        accessKeyId: "mps3",
        secretAccessKey: "ZOAmumEzdsUUcVlQ",
      },
      forcePathStyle: true,
      //logger: console,
    });

    try {
      console.log("creating bucket");
      await s3.createBucket({
        Bucket: "test5",
      });
    } catch (e) {}

    try {
      console.log("enable version");
      await s3.putBucketVersioning({
        Bucket: "test5",
        VersioningConfiguration: {
          Status: "Enabled",
        },
      });
    } catch (e) {
      console.error(e);
    }
  });

  const getClient = () =>
    new MPS3({
      defaultBucket: "test5",
      api: s3,
    });

  test("Read unknown key resolves to undefined", async () => {
    const mps3 = getClient();
    const read = await mps3.get("unused_key");
    expect(read).toEqual(undefined);
  });

  test("Delete key by setting to undefined", async () => {
    const mps3 = getClient();
    await mps3.put("delete", "");
    await mps3.put("delete", undefined);
    const read = await mps3.get("delete");
    expect(read).toEqual(undefined);
  });

  test("Can read your write (number)", async () => {
    const mps3 = getClient();
    const rnd = Math.random();
    await mps3.put("rw", rnd);
    const read = await mps3.get("rw");
    expect(read).toEqual(rnd);
  });

  test("Can read your write uses cache", async (done) => {
    const mps3 = getClient();
    const rnd = Math.random();
    const promise = mps3.put("rw", rnd); // no await
    let has_read = false;
    promise.then(() => {
      expect(has_read).toEqual(true);
      done();
    });
    const read = await mps3.get("rw");
    has_read = true;
    expect(read).toEqual(rnd);
  });

  test("Consecutive gets use manifest cache", async () => {
    const mps3 = getClient();
    await mps3.get("cache_get");
    await mps3.get("cache_get");
  });

  test("Subscribe to changes (single client, unseeen key)", async (done) => {
    const mps3 = getClient();
    const rand_key = `subscribe_single_client/${Math.random().toString()}`;
    const rnd = Math.random();
    expect(mps3.subscriberCount).toEqual(0);
    let callbackCount = 0;
    const unsubscribe = mps3.subscribe(rand_key, (value) => {
      expect(mps3.subscriberCount).toEqual(1);
      if (callbackCount === 0) {
        expect(value).toEqual(undefined);
        callbackCount++;
      } else if (callbackCount === 1) {
        expect(value).toEqual(rnd);
        unsubscribe();
        expect(mps3.subscriberCount).toEqual(0);
        done();
      }
    });
    mps3.put(rand_key, rnd);
    expect(mps3.subscriberCount).toEqual(1);
  });

  test("Subscribe to changes (cross-client, unseeen key)", async (done) => {
    const mps3 = getClient();
    const mps3_other = getClient();
    const rand_key = `subscribe_multi_client/${Math.random().toString()}`;
    expect(mps3.subscriberCount).toEqual(0);
    expect(mps3_other.subscriberCount).toEqual(0);
    let callbackCount = 0;
    const unsubscribe = mps3_other.subscribe(rand_key, (value) => {
      if (callbackCount === 0) {
        expect(value).toEqual(undefined);
        callbackCount++;
      } else if (callbackCount === 1) {
        expect(value).toEqual("_");
        unsubscribe();
        done();
      }
    });
    mps3.put(rand_key, "_");
  });

  test("Subscribe get committed initial value first", async (done) => {
    const mps3 = getClient();
    const rnd = Math.random();
    await mps3.put("subscribe_initial", rnd);

    const unsubscribe = mps3.subscribe("subscribe_initial", (value) => {
      expect(value).toEqual(rnd);
      unsubscribe();
      done();
    });
  });

  test("Subscribe get optimistic initial value first", async (done) => {
    const mps3 = getClient();
    const rnd = Math.random();
    mps3.put("subscribe_initial", rnd);

    const unsubscribe = await mps3.subscribe("subscribe_initial", (value) => {
      expect(value).toEqual(rnd);
      unsubscribe();
      done();
    });
  });

  // TODO, but with parrallel puts on a blank manifest
  test("Parallel puts commute (warm manifest)", async () => {
    await getClient().put("null", null);
    const n = 3;
    const clients = [...Array(n)].map((_) => getClient());
    const rand_keys = [...Array(n)].map(
      (_, i) => `parallel_put/${i}_${Math.random().toString()}`
    );

    // put in parallel
    await Promise.all(rand_keys.map((key, i) => clients[i].put(key, i)));

    // read in parallel
    const reads = await Promise.all(
      rand_keys.map((key, i) => clients[n - i - 1].get(key))
    );

    expect(reads).toEqual([...Array(n)].map((_, i) => i));
  });
  /*
  test("Parallel puts commute (cold manifest)", async () => {
    const manifests = [
      {
        key: Math.random().toString(),
      },
    ];
    const n = 3;
    const clients = [...Array(n)].map((_) => getClient());
    const rand_keys = [...Array(n)].map(
      (_, i) => `parallel_put/${i}_${Math.random().toString()}`
    );

    // put in parallel
    await Promise.all(
      rand_keys.map((key, i) =>
        clients[i].put(key, i, {
          manifests,
        })
      )
    );

    // read in parallel
    const reads = await Promise.all(
      rand_keys.map((key, i) =>
        clients[n - i - 1].get(key, {
          manifest: manifests[0],
        })
      )
    );

    expect(reads).toEqual([...Array(n)].map((_, i) => i));
  });*/
});
