# Connections

Connections (spans) between nodes.

<!-- BEGIN GENERATED: Connections -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/connections`](#get-all-connections) | TBD | Get all connections |
| `POST` | [`/jobs/{job_id}/connections`](#create-a-connection) | TBD | Create a connection |
| `GET` | [`/jobs/{job_id}/connections/{connection_id}`](#get-a-connection) | TBD | Get a connection |
| `POST` | [`/jobs/{job_id}/connections/{connection_id}`](#update-a-connection) | TBD | Update a connection |
| `DELETE` | [`/jobs/{job_id}/connections/{connection_id}`](#delete-a-connection) | TBD | Delete a connection |

### Get all connections

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/connections
```

**Average token cost:** TBD

Gets all connections (and their sections) in the job.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |

### Create a connection

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/connections
```

**Average token cost:** TBD

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `node_id_1` | string | ✓ | Id of the first node the connection joins. |
| `node_id_2` | string | ✓ | Id of the second node the connection joins. |
| `attributes` | object (entity attribute list) |  | Entity attribute list: maps each attribute name to its instance ids and values. Set an attribute or instance to `null` to remove it. See [Working with attributes](../concepts/attributes.md). |
| `add_attributes` | object (flat map) |  | Flat map of attribute name to value; the API generates instance ids for you. See [Working with attributes](../concepts/attributes.md). |
| `breakpoints` | array of [lat, lon] |  | Optional polyline geometry: array of [latitude, longitude] pairs. Omit or [] for none. |

### Get a connection

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/connections/{connection_id}
```

**Average token cost:** TBD

Gets the connection and its sections.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `connection_id` | string | Id of the connection. |

### Update a connection

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/connections/{connection_id}
```

**Average token cost:** TBD

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `connection_id` | string | Id of the connection. |

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `onlyIfExists` | `true` \| `false` | If `"true"`, the resource is only updated if it exists (no creation). |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `node_id_1` | string |  | Id of the first node the connection joins. |
| `node_id_2` | string |  | Id of the second node the connection joins. |
| `attributes` | object (entity attribute list) |  | Entity attribute list: maps each attribute name to its instance ids and values. Set an attribute or instance to `null` to remove it. See [Working with attributes](../concepts/attributes.md). |
| `add_attributes` | object (flat map) |  | Flat map of attribute name to value; the API generates instance ids for you. See [Working with attributes](../concepts/attributes.md). |
| `remove_attributes` | array<string> |  | List of attribute names to remove; all instances of each are removed. See [Working with attributes](../concepts/attributes.md). |
| `breakpoints` | array of [lat, lon] |  | Polyline geometry: array of [latitude, longitude] pairs. Send null or [] to clear; omit to leave unchanged. |

### Delete a connection

```sh
DELETE https://katapultpro.com/api/v3/jobs/{job_id}/connections/{connection_id}
```

**Average token cost:** TBD

Deletes the connection and all of its sections.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `connection_id` | string | Id of the connection. |

<!-- END GENERATED: Connections -->

## Breakpoints

`breakpoints` define a connection's polyline geometry — the intermediate
vertices the span routes through, in addition to its two endpoint nodes. It is
an array of `[latitude, longitude]` pairs:

```json
{
  "node_id_1": "-Node1...",
  "node_id_2": "-Node2...",
  "breakpoints": [[40.585, -105.084], [40.586, -105.082]]
}
```

Each pair must be two finite numbers, with latitude in `[-90, 90]` and longitude
in `[-180, 180]`. An invalid pair (wrong length, non-number, or out of range)
fails the request with [`invalid_field`](../concepts/responses-and-errors.md)
for `breakpoints`.

Create vs. update semantics:

- **Create** (`POST .../connections`): omitting `breakpoints` or sending `[]`
  creates the connection with no breakpoints.
- **Update** (`POST .../connections/{connection_id}`): sending `null` or `[]`
  **clears** existing breakpoints; **omitting `breakpoints` leaves them
  unchanged**. Moving a connection (changing `node_id_1`/`node_id_2`) preserves
  its breakpoints.

A connection that has breakpoints returns them on `GET`.
