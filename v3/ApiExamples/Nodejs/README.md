# Node.js examples

Single-endpoint examples for the Katapult Pro API v3 using
[`axios`](https://www.npmjs.com/package/axios). Each file is named
`node-{operationId}.js`, where `{operationId}` is the OpenAPI `operationId` from
[`../../openapi.yaml`](../../openapi.yaml) — e.g. `node-listJobs.js`,
`node-createNode.js`, `node-getPhotoUrl.js`.

See the [examples index](../README.md) for the naming scheme and the other
languages, and the [guides](../../guides/) for end-to-end workflows.

## Prerequisites

- [Node.js](https://nodejs.org/) (any recent LTS).
- The `axios` package:

  ```sh
  npm install axios
  ```

## Run an example

1. Open the file you want to run and replace the placeholder constants near the
   top — at minimum `API_KEY` (`<<YOUR_API_KEY>>`), plus any path ids the
   example uses (`JOB_ID`, `NODE_ID`, …).
2. Run it with `node`:

   ```sh
   node node-listJobs.js
   ```

Each example prints the HTTP status and the full response body, so you can see
the returned `data` and the token `meta` (your remaining `token_count` and
`last_refill_time`). On an error it prints the HTTP status and the error body so
the error `type` is visible. See
[Rate limits & the token bucket](../../rate-limits.md).

## Photo upload examples need `sample.jpg`

The upload examples — `node-uploadPhoto.js`, `node-uploadPhotoToNode.js`, and
`node-uploadPhotoToSection.js` — read raw JPEG bytes from a local file named
`sample.jpg` and send them with `Content-Type: image/jpeg`. Place your own
`sample.jpg` in this directory before running them:

```sh
node node-uploadPhotoToNode.js
```
