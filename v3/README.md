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
> truth for every endpoint, parameter, schema, and average token cost (encoded
> as the `x-average-token-cost` extension on each operation). Prefer it for structured lookups;
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

Every endpoint, grouped by resource, generated from [`openapi.yaml`](openapi.yaml).
Each heading links to that resource's full reference page. 🔒 marks restricted
endpoints (disabled in production). The service welcome endpoint `GET /` is covered
in [Quick start](#quick-start) above.

<!-- BEGIN GENERATED: Endpoint Index -->
<!-- Do not edit by hand. Generated from openapi.yaml by `npm run docs:gen:md`. -->

### [Jobs](reference/jobs.md)

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs`](reference/jobs.md#list-all-jobs) | 2014 | List all jobs |
| `POST` | [`/jobs`](reference/jobs.md#create-a-job) | 17 | Create a job |
| `GET` | [`/jobs/{job_id}`](reference/jobs.md#get-a-job-partial-data) | 3 | Get a job (partial data) |
| `POST` | [`/jobs/{job_id}`](reference/jobs.md#update-a-job) | 49 | Update a job |
| `POST` | [`/jobs/{job_id}/raw`](reference/jobs.md#raw-job-write) 🔒 | 1 | Raw job write |
| `GET` | [`/jobs/{job_id}/status`](reference/jobs.md#get-job-status) | 1 | Get job status |
| `POST` | [`/jobs/{job_id}/status`](reference/jobs.md#update-job-status) | 1 | Update job status |

### [Nodes](reference/nodes.md)

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/nodes`](reference/nodes.md#get-all-nodes) | 138 | Get all nodes |
| `POST` | [`/jobs/{job_id}/nodes`](reference/nodes.md#create-a-node) | 15 | Create a node |
| `GET` | [`/jobs/{job_id}/nodes/{node_id}`](reference/nodes.md#get-a-node) | 1 | Get a node |
| `POST` | [`/jobs/{job_id}/nodes/{node_id}`](reference/nodes.md#update-a-node) | 40 | Update a node |
| `DELETE` | [`/jobs/{job_id}/nodes/{node_id}`](reference/nodes.md#delete-a-node) | 4933 | Delete a node |
| `POST` | [`/jobs/{job_id}/nodes/{node_id}/photos`](reference/nodes.md#upload-a-photo-to-a-node) | 5 | Upload a photo to a node |

### [Connections](reference/connections.md)

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/connections`](reference/connections.md#get-all-connections) | 127 | Get all connections |
| `POST` | [`/jobs/{job_id}/connections`](reference/connections.md#create-a-connection) | 17 | Create a connection |
| `GET` | [`/jobs/{job_id}/connections/{connection_id}`](reference/connections.md#get-a-connection) | 1 | Get a connection |
| `POST` | [`/jobs/{job_id}/connections/{connection_id}`](reference/connections.md#update-a-connection) | 18 | Update a connection |
| `DELETE` | [`/jobs/{job_id}/connections/{connection_id}`](reference/connections.md#delete-a-connection) | 2566 | Delete a connection |

### [Sections](reference/sections.md)

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/connections/{connection_id}/sections`](reference/sections.md#get-all-sections-on-a-connection) | 1 | Get all sections on a connection |
| `POST` | [`/jobs/{job_id}/connections/{connection_id}/sections`](reference/sections.md#create-a-section) | 17 | Create a section |
| `GET` | [`/jobs/{job_id}/connections/{connection_id}/sections/{section_id}`](reference/sections.md#get-a-section) | 1 | Get a section |
| `POST` | [`/jobs/{job_id}/connections/{connection_id}/sections/{section_id}`](reference/sections.md#update-a-section) | 16 | Update a section |
| `DELETE` | [`/jobs/{job_id}/connections/{connection_id}/sections/{section_id}`](reference/sections.md#delete-a-section) | 5920 | Delete a section |
| `POST` | [`/jobs/{job_id}/connections/{connection_id}/sections/{section_id}/photos`](reference/sections.md#upload-a-photo-to-a-section) | 3 | Upload a photo to a section |

### [Photos](reference/photos.md)

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/photos`](reference/photos.md#get-all-photos) | 1147 | Get all photos |
| `POST` | [`/jobs/{job_id}/photos`](reference/photos.md#upload-a-photo) | 1 | Upload a photo |
| `GET` | [`/jobs/{job_id}/photos/{photo_id}`](reference/photos.md#get-a-photo) | 2 | Get a photo |
| `GET` | [`/jobs/{job_id}/photos/{photo_id}/url`](reference/photos.md#get-a-photo-download-url) | 4 | Get a photo download URL |
| `POST` | [`/jobs/{job_id}/photos/{photo_id}/associate`](reference/photos.md#associate-a-photo-to-an-item) | 1286 | Associate a photo to an item |

### [Photo Elements](reference/photo-elements.md)

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/photos/{photo_id}/photo_elements`](reference/photo-elements.md#get-all-elements-on-a-photo) | 4 | Get all elements on a photo |
| `POST` | [`/jobs/{job_id}/photos/{photo_id}/photo_elements`](reference/photo-elements.md#create-a-photo-element) | 515 | Create a photo element |
| `GET` | [`/jobs/{job_id}/photos/{photo_id}/photo_elements/{element_id}`](reference/photo-elements.md#get-a-photo-element) | 7 | Get a photo element |
| `POST` | [`/jobs/{job_id}/photos/{photo_id}/photo_elements/{element_id}`](reference/photo-elements.md#update-a-photo-element) | 994 | Update a photo element |
| `DELETE` | [`/jobs/{job_id}/photos/{photo_id}/photo_elements/{element_id}`](reference/photo-elements.md#delete-a-photo-element) | 933 | Delete a photo element |

### [Calibration Anchors](reference/calibration-anchors.md)

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/photos/{photo_id}/calibration_anchors`](reference/calibration-anchors.md#get-all-calibration-anchors-on-a-photo) | 4 | Get all calibration anchors on a photo |
| `POST` | [`/jobs/{job_id}/photos/{photo_id}/calibration_anchors`](reference/calibration-anchors.md#create-a-calibration-anchor) | 435 | Create a calibration anchor |
| `GET` | [`/jobs/{job_id}/photos/{photo_id}/calibration_anchors/{anchor_id}`](reference/calibration-anchors.md#get-a-calibration-anchor) | 1 | Get a calibration anchor |
| `POST` | [`/jobs/{job_id}/photos/{photo_id}/calibration_anchors/{anchor_id}`](reference/calibration-anchors.md#update-a-calibration-anchor) | 2691 | Update a calibration anchor |
| `DELETE` | [`/jobs/{job_id}/photos/{photo_id}/calibration_anchors/{anchor_id}`](reference/calibration-anchors.md#delete-a-calibration-anchor) | 685 | Delete a calibration anchor |

### [Traces](reference/traces.md)

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/traces`](reference/traces.md#get-all-traces) | 175 | Get all traces |
| `POST` | [`/jobs/{job_id}/traces`](reference/traces.md#create-a-trace) | 5802 | Create a trace |
| `GET` | [`/jobs/{job_id}/traces/{trace_id}`](reference/traces.md#get-a-trace) | 2 | Get a trace |
| `POST` | [`/jobs/{job_id}/traces/{trace_id}`](reference/traces.md#update-a-trace) | 7272 | Update a trace |
| `DELETE` | [`/jobs/{job_id}/traces/{trace_id}`](reference/traces.md#delete-a-trace) | 5902 | Delete a trace |

### [Models](reference/models.md)

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/models`](reference/models.md#get-model-options) | 2 | Get model options |
| `GET` | [`/models/{modelKey}`](reference/models.md#get-model-data) | 394 | Get model data |

### [Users](reference/users.md)

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/users`](reference/users.md#list-all-users) | 186 | List all users |
| `GET` | [`/users/whoami`](reference/users.md#get-current-user) | 1 | Get current user |
| `GET` | [`/users/{user_id}`](reference/users.md#get-a-user) | 1 | Get a user |
| `GET` | [`/users/{user_id}/active_state`](reference/users.md#get-user-active-state) 🔒 | 1 | Get user active state |
| `POST` | [`/users/{user_id}/active_state`](reference/users.md#set-user-active-state) 🔒 | 1 | Set user active state |

### [Companies](reference/companies.md)

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/companies/{company_id}/tracked_actions`](reference/companies.md#list-tracked-actions) | 1 | List tracked actions |
| `GET` | [`/companies/{company_id}/action_models`](reference/companies.md#list-action-models) | 1 | List action models |

<!-- END GENERATED: Endpoint Index -->

**Other pages** (hand-maintained, not in the generated index):

- [Restricted endpoints](reference/restricted.md) — in the spec but disabled in production (the 🔒 rows above).

## Concepts

- [Rate limits & the token bucket](rate-limits.md) — average token costs, refills, and
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
`<!-- END GENERATED -->` markers on each reference page, and the consolidated
[Endpoint reference](#endpoint-reference) index on this page lives between
`<!-- BEGIN GENERATED: Endpoint Index -->` / `<!-- END GENERATED: Endpoint Index -->`.
`npm run docs:gen` regenerates all of them. Prose outside those markers — including
the **Other pages** list above and the Quick start welcome example — is preserved
and hand-maintained, as are the code examples in `ApiExamples/`.
