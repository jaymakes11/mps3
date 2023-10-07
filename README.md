# MPS3
⚠️ Under development

## Vendorless Database over any s3 storage API. 

An offline-first browser database over any S3-compatible API.

- Avoid vendor lock-in, your data stays with you.
- Built for operational simplicity
    - no infra to setup and manage apart from the storage bucket.
    - intuitive storage representation that can be manipulated directly
- Designed for correctness
    - sync protocol is [causally consistent](docs/causal_consistency_checking.md) under concurrent writes.
- Web optimized, it's currently 25kb, making it significantly lighter-weight than the AWS S3 browser client (300kb).
- Offline-first (WIP)


Tested with S3, Backblaze, R2 and self-hosted solutions like Minio ([running examples](https://observablehq.com/@tomlarkworthy/mps3-vendor-examples)).

## Concepts

MPS3 is a key-value document store. A manifest lists all keys in the DB as references to files hosted on s3. Setting a key first writes the content to storage, then updates the manifest. To enable subscriptions, the client polls the manifest for changes. To enable causally consistent concurrent writes, the manifest is represented as a time indexed log of patches and checkpoints which is resolved on read.

Manifests should not contain too many keys as it adds overheads. A manifest should encapsule a single consistency boundary (e.g. a channel in a chat). You can share keys between multiple manifests and move keys in, out and across, manifests lightly ([TODO](https://github.com/endpointservices/mps3/issues/12)).


## API

To use this library you construct an MP3S class.


[mps3 class](docs/api/classes/MPS3.md)

### Quick start ([Codepen](https://codepen.io/tomlarkworthy/pen/QWzybxd))
```
import {MPS3} from 'https://cdn.skypack.dev/mps3@0.0.58?min';

const mps3 = new MPS3({
  defaultBucket: "<BUCKET>",
  s3Config: {
    region: "<REGION>",
    credentials: {
      accessKeyId: "<ACCESS_KEY>",
      secretAccessKey: "<SECRET_KEY>"
    }
  }
});

mps3.put("key", "myValue"); // can await for confirmation

mps3.subscribe("key", (val) => console.log(val)); // causally consist listeners

const value = await mps3.get("key"); // read-after-write consist
```



### CORS

For the client to work properly some CORS configuration is required on the bucket so the Javascript environment can observe relevant
 metadata.

```
[{
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["X-Amz-Version-Id", "ETag"]
}]
```
### Authorization

There is no in-built authorization. Every use-case needs different authorization. A malicious user could sabotage the manifest file if they have unrestricted write permissions to the manifest file, but not all use-cases have malicious users. There are a few options:-

- Share access key only to trusted personal.
- If using S3 and IAM, issue STS tokens that grant access to a subpath of a bucket per user/team
- For public use, use a third-party auth solution and a authenticating proxy. Verify manifest changes are valid during passthrough, there is an example of an proxy configuration [here](mps3-proxy.endpointservices.workers.dev/) that hides credentials from the browser using a CloudFlare worker.


### Advanced Usage

Consult the [API Documentation
](docs/api/classes/MPS3.md) for advanced usage.
- atomic batch operations
- multiple manifests
