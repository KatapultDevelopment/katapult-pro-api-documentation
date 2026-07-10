# Traces

Traces grouping photo elements.

Trace attributes are stored as a flat map directly on the trace — see
[Working with attributes](../concepts/attributes.md#photo-elements-and-traces).

<!-- BEGIN GENERATED: Traces -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/traces`](#get-all-traces) | 1 | Get all traces |
| `POST` | [`/jobs/{job_id}/traces`](#create-a-trace) | 10 | Create a trace |
| `GET` | [`/jobs/{job_id}/traces/{trace_id}`](#get-a-trace) | 1 | Get a trace |
| `POST` | [`/jobs/{job_id}/traces/{trace_id}`](#update-a-trace) | 10 | Update a trace |
| `DELETE` | [`/jobs/{job_id}/traces/{trace_id}`](#delete-a-trace) | 10 | Delete a trace |

### Get all traces

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/traces
```

**Token cost:** 1

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |

### Create a trace

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/traces
```

**Token cost:** 10

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `trace_type` | string | ✓ | Type of the trace. |
| `attributes` | object (flat map) |  | Flat map of attributes stored directly on the trace (attribute name to value). See [Working with attributes](../concepts/attributes.md#photo-elements-and-traces). |

### Get a trace

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/traces/{trace_id}
```

**Token cost:** 1

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `trace_id` | string | Id of the trace. |

### Update a trace

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/traces/{trace_id}
```

**Token cost:** 10

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `trace_id` | string | Id of the trace. |

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `onlyIfExists` | `true` \| `false` | If `"true"`, the resource is only updated if it exists (no creation). |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `trace_type` | string |  | Type of the trace. |
| `attributes` | object (flat map) |  | Flat map of attributes stored directly on the trace (attribute name to value). See [Working with attributes](../concepts/attributes.md#photo-elements-and-traces). |

### Delete a trace

```sh
DELETE https://katapultpro.com/api/v3/jobs/{job_id}/traces/{trace_id}
```

**Token cost:** 10

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `trace_id` | string | Id of the trace. |

<!-- END GENERATED: Traces -->
