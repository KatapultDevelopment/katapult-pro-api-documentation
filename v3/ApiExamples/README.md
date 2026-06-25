# Code examples

Runnable, single-endpoint examples for the Katapult Pro API v3 in two
languages. Each example targets the production base URL
`https://katapultpro.com/api/v3` and authenticates with the `api_key` query
parameter. They are self-contained: substitute your API key (and any ids) and
run.

For end-to-end workflows that chain several endpoints together, see the
[guides](../guides/) instead — these examples each focus on a single call.

## Languages

| Language | Directory | Runtime / deps |
| --- | --- | --- |
| Node.js | [`Nodejs/`](Nodejs/) | `axios` (`npm install axios`) |
| Python | [`Python/`](Python/) | `requests` (`pip install requests`) |

Each language directory has its own README with run instructions:
[Node.js](Nodejs/README.md) · [Python](Python/README.md).

## Naming scheme

File and method names are keyed to the OpenAPI `operationId` from
[`../openapi.yaml`](../openapi.yaml), so an endpoint maps to the same name in
every language:

- **Node:** `Nodejs/node-{operationId}.js`
- **Python:** `Python/py-{operationId}.py`

For example, the `listJobs` operation is `node-listJobs.js` and
`py-listJobs.py`. Other operationIds you will see include `createNode`,
`createConnection`, `createSection`, `getPhotoUrl`, `associatePhoto`,
`createPhotoElement`, and `createCalibrationAnchor`. The full list of
operationIds lives in [`../openapi.yaml`](../openapi.yaml).

## These examples are hand-maintained

Unlike the endpoint reference tables in [`../reference/`](../reference/) — which
are **generated** from `../openapi.yaml` — the code in these directories is
**hand-written and hand-maintained**. When the spec changes, the examples are updated by hand to
match. If you spot a discrepancy, treat
[`../openapi.yaml`](../openapi.yaml) as the source of truth.

Authoring conventions for these files are documented in [`STYLE.md`](STYLE.md).

## Notes

- **Photo uploads** (`uploadPhoto`, `uploadPhotoToNode`, `uploadPhotoToSection`)
  send raw `image/jpeg` bytes from a local `sample.jpg`. Provide your own JPEG
  named `sample.jpg` in the example directory before running those.
- Every example prints the HTTP status and the response body, so the token
  `meta` and any error `type` are visible. See
  [Rate limits & the token bucket](../rate-limits.md).
