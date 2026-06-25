# Katapult Pro API v3

The v3 REST API for reading and writing Katapult Pro jobs and their contents
(nodes, connections, sections, photos, photo elements, calibration anchors, and
traces), plus models and users.

- **Base URL:** `https://katapultpro.com/api/v3`
- **Authentication:** API key, passed as the `api_key` query parameter.
- **Machine-readable spec:** [`openapi.yaml`](openapi.yaml) (OpenAPI 3.1) is the
  canonical contract. The endpoint tables in [`reference/`](reference/) are
  generated from it — see [Maintaining these docs](#maintaining-these-docs).

> **For AI agents:** [`openapi.yaml`](openapi.yaml) is the single source of
> truth for every endpoint, parameter, schema, and token cost (encoded as the
> `x-token-cost` extension on each operation). Prefer it for structured lookups;
> use the Markdown pages for prose, concepts, and examples.

## Quick start

Every request needs your API key. Generate one from the **API Key** widget on
the Katapult Pro home page. Verify it with the welcome endpoint:

```sh
curl "https://katapultpro.com/api/v3?api_key=YOUR_API_KEY"
```

```json
{ "status": "success", "message": "Welcome to the Katapult Pro API V3" }
```

Then list your jobs:

```sh
curl "https://katapultpro.com/api/v3/jobs?api_key=YOUR_API_KEY"
```

See [`guides/`](guides/) for end-to-end walkthroughs, and [`ApiExamples/`](ApiExamples/)
for runnable Node and Python examples.

## Endpoint reference

| Resource | Page |
| --- | --- |
| Jobs | [reference/jobs.md](reference/jobs.md) |
| Nodes | [reference/nodes.md](reference/nodes.md) |
| Connections | [reference/connections.md](reference/connections.md) |
| Sections | [reference/sections.md](reference/sections.md) |
| Photos | [reference/photos.md](reference/photos.md) |
| Photo Elements | [reference/photo-elements.md](reference/photo-elements.md) |
| Calibration Anchors | [reference/calibration-anchors.md](reference/calibration-anchors.md) |
| Traces | [reference/traces.md](reference/traces.md) |
| Models | [reference/models.md](reference/models.md) |
| Users | [reference/users.md](reference/users.md) |
| Companies | [reference/companies.md](reference/companies.md) |
| Restricted (not in production) | [reference/restricted.md](reference/restricted.md) |
| Coming soon | [reference/coming-soon.md](reference/coming-soon.md) |

## Concepts

- [Rate limits & the token bucket](rate-limits.md) — token costs, refills, and
  best practices for heavy scripts.
- [Working with attributes](concepts/attributes.md)
- [Complex & codependent parameters](concepts/complex-parameters.md) — worked examples for tricky field combinations (photo association, the attribute trio, `make_midpoint`, `onlyIfExists`, model `paths`).
- [Resource ID requirements](concepts/resource-ids.md)
- [Responses & errors](concepts/responses-and-errors.md)

## Examples & tooling

- [Guides](guides/) — end-to-end workflows.
- [Code examples](ApiExamples/) — Node.js and Python.

## Maintaining these docs

`openapi.yaml` is the only hand-edited source for endpoint contracts. After
changing it, regenerate the derived artifacts from the repository root:

```sh
npm install      # first time only
npm run docs:validate   # lint the spec
npm run docs:gen        # regenerate reference tables
```

The generated endpoint tables live between `<!-- BEGIN GENERATED -->` /
`<!-- END GENERATED -->` markers on each reference page; prose outside those
markers is preserved. The code examples in `ApiExamples/` are hand-maintained.
