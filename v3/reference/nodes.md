# Nodes

Nodes within a job.

<!-- BEGIN GENERATED: Nodes -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/nodes`](#get-all-nodes) | 1 | Get all nodes |
| `POST` | [`/jobs/{job_id}/nodes`](#create-a-node) | 10 | Create a node |
| `GET` | [`/jobs/{job_id}/nodes/{node_id}`](#get-a-node) | 1 | Get a node |
| `POST` | [`/jobs/{job_id}/nodes/{node_id}`](#update-a-node) | 10 | Update a node |
| `DELETE` | [`/jobs/{job_id}/nodes/{node_id}`](#delete-a-node) | 10 | Delete a node |
| `POST` | [`/jobs/{job_id}/nodes/{node_id}/photos`](#upload-a-photo-to-a-node) | 10 | Upload a photo to a node |

### Get all nodes

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/nodes
```

**Token cost:** 1

Gets all nodes in the job. Results are ordered by `last_updated` descending (most recent first); each node includes a `last_updated` timestamp when one is available. Use `last_updated` to fetch only nodes changed since a given time, and `limit` to cap the result count.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `last_updated` | string | ISO-8601 date/time. Returns only records updated **strictly after** this time. Results are ordered by `last_updated` descending (most recent first). Invalid values return `invalid_request`. |
| `limit` | integer | Maximum number of records to return (positive integer; no upper cap). Invalid values return `invalid_request`. |

### Create a node

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/nodes
```

**Token cost:** 10

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `latitude` | number | ✓ |  |
| `longitude` | number | ✓ |  |
| `attributes` | object (entity attribute list) |  |  |
| `add_attributes` | object (flat map) |  |  |

### Get a node

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/nodes/{node_id}
```

**Token cost:** 1

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `node_id` | string | Id of the node. |

### Update a node

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/nodes/{node_id}
```

**Token cost:** 10

Updates the node. If the node does not exist, it is created with the specified id (must meet the resource ID requirements) unless `onlyIfExists=true`.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `node_id` | string | Id of the node. |

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `onlyIfExists` | `true` \| `false` | If `"true"`, the resource is only updated if it exists (no creation). |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `latitude` | number |  |  |
| `longitude` | number |  |  |
| `attributes` | object (entity attribute list) |  |  |
| `add_attributes` | object (flat map) |  |  |
| `remove_attributes` | array<string> |  |  |

### Delete a node

```sh
DELETE https://katapultpro.com/api/v3/jobs/{job_id}/nodes/{node_id}
```

**Token cost:** 10

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `node_id` | string | Id of the node. |

### Upload a photo to a node

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/nodes/{node_id}/photos
```

**Token cost:** 10

Uploads a JPEG and associates it to the specified node.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `node_id` | string | Id of the node. |

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `association_value` | `true` \| `main` | How to associate the uploaded photo. Defaults to `true`. |

Request body: raw `image/jpeg` bytes.

<!-- END GENERATED: Nodes -->

## Listing & incremental updates

`GET /jobs/{job_id}/nodes` returns nodes ordered by `last_updated` (most recent
first), each carrying a `last_updated` timestamp when one is available. To sync
incrementally, pass the newest `last_updated` you have seen back as the
`last_updated` query parameter (ISO-8601) to receive only nodes changed **after**
that time — the bound is exclusive. Use `limit` to cap the number of nodes
returned.
