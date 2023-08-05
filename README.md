# mps3
Multiplayer over any s3-compatible storage. Written to provide a fast path for multiplayer without vendor locking. Designed with orthogonality:
- pluggable storage thanks to the de factor standardization of the s3 API.
- pluggable auth through axios interceptors (including off-the-shelf solutions like aws4-axios).

You can use this library over S3, R2 or self hosted solutions like Minio

## Features

- Optimistic updates
- Pluggable authentication
- Atomic bulk s3 operations
- Multiplayer
- Sha256 Checksums

coming soon
- Offline first


## API
### subscribe(key, callback)

Receive notifications snapshots of state at the key, delivered to the callback.
Local writes will trigger the callback without a network round trip.
Remote writes are received in the order they are written to the remote state (monotonic),
however, you are not gauranteed to receive every intermediate state, so your communication style should be stateless/declarative (i.e. RESTFul)
## How it works

Manifest files the metadata required to resolve snapshot state.
- all files and their version
- the update operation (used to resolve concurrent writes)
- ref to the previous manifest the update was based on


### Avoiding mid-air collision

The normal way is is etag and in-none-match headers, but s3 does not support this.

There is no conditional if-none-match PUT request on S3. Thus all writes will make it to the bucket, even those made concurrently. Thus the `previous` pointer does not necissaril include all writes made in parrallel. Resolution has do be done at read time. We query for all object bersions made from a manifest file to the previous pointer, using the `update` parameter to rebase over the current state.
