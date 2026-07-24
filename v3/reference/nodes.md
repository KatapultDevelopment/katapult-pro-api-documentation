# Nodes

Nodes within a job.

<!-- BEGIN GENERATED: Nodes -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/nodes`](#get-all-nodes) | TBD | Get all nodes |
| `POST` | [`/jobs/{job_id}/nodes`](#create-a-node) | TBD | Create a node |
| `GET` | [`/jobs/{job_id}/nodes/{node_id}`](#get-a-node) | TBD | Get a node |
| `POST` | [`/jobs/{job_id}/nodes/{node_id}`](#update-a-node) | TBD | Update a node |
| `DELETE` | [`/jobs/{job_id}/nodes/{node_id}`](#delete-a-node) | TBD | Delete a node |
| `POST` | [`/jobs/{job_id}/nodes/{node_id}/photos`](#upload-a-photo-to-a-node) | TBD | Upload a photo to a node |

### Get all nodes

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/nodes
```

**Average token cost:** TBD

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

**Average token cost:** TBD

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `latitude` | number | ✓ | Latitude of the node in decimal degrees. |
| `longitude` | number | ✓ | Longitude of the node in decimal degrees. |
| `attributes` | object (entity attribute list) |  | Entity attribute list: maps each attribute name to its instance ids and values. Set an attribute or instance to `null` to remove it. See [Working with attributes](../concepts/attributes.md). |
| `add_attributes` | object (flat map) |  | Flat map of attribute name to value; the API generates instance ids for you. See [Working with attributes](../concepts/attributes.md). |

### Get a node

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/nodes/{node_id}
```

**Average token cost:** TBD

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `node_id` | string | Id of the node. |

### Update a node

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/nodes/{node_id}
```

**Average token cost:** TBD

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
| `latitude` | number |  | Latitude of the node in decimal degrees. |
| `longitude` | number |  | Longitude of the node in decimal degrees. |
| `attributes` | object (entity attribute list) |  | Entity attribute list: maps each attribute name to its instance ids and values. Set an attribute or instance to `null` to remove it. See [Working with attributes](../concepts/attributes.md). |
| `add_attributes` | object (flat map) |  | Flat map of attribute name to value; the API generates instance ids for you. See [Working with attributes](../concepts/attributes.md). |
| `remove_attributes` | array<string> |  | List of attribute names to remove; all instances of each are removed. See [Working with attributes](../concepts/attributes.md). |

### Delete a node

```sh
DELETE https://katapultpro.com/api/v3/jobs/{job_id}/nodes/{node_id}
```

**Average token cost:** TBD

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `node_id` | string | Id of the node. |

### Upload a photo to a node

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/nodes/{node_id}/photos
```

**Average token cost:** TBD

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
