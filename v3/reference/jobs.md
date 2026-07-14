# Jobs

Create, read, update, and archive jobs.

<!-- BEGIN GENERATED: Jobs -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs`](#list-all-jobs) | 1 | List all jobs |
| `POST` | [`/jobs`](#create-a-job) | 10 | Create a job |
| `GET` | [`/jobs/{job_id}`](#get-a-job-partial-data) | 1 | Get a job (partial data) |
| `POST` | [`/jobs/{job_id}`](#update-a-job) | 10 | Update a job |
| `POST` | [`/jobs/{job_id}/raw`](#raw-job-write) 🔒 | 10 | Raw job write |
| `GET` | [`/jobs/{job_id}/status`](#get-job-status) | 1 | Get job status |
| `POST` | [`/jobs/{job_id}/status`](#update-job-status) | 10 | Update job status |

### List all jobs

```sh
GET https://katapultpro.com/api/v3/jobs
```

**Token cost:** 1

Gets a list of jobs accessible to the requester. List entries do not contain full job data. Results are ordered by `last_updated` descending (most recent first); each entry includes a `last_updated` timestamp when one is available. Use `last_updated` to fetch only jobs changed since a given time, and `limit` to cap the result count.

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `includeArchived` | `true` \| `false` | If `"true"`, archived jobs are included. By default only active jobs are returned. |
| `metadataFilter` | string | Metadata filter formatted as `{attribute}:{value}`; separate multiple filters with commas (e.g. `city:Buffalo,status:done`). Ignored when `list=true`. |
| `list` | `true` \| `false` | If `"true"`, returns lightweight list entries instead of the default permission entries. `metadataFilter` is ignored in this mode. |
| `last_updated` | string | ISO-8601 date/time. Returns only records updated **strictly after** this time. Results are ordered by `last_updated` descending (most recent first). Invalid values return `invalid_request`. |
| `limit` | integer | Maximum number of records to return (positive integer; no upper cap). Invalid values return `invalid_request`. |

### Create a job

```sh
POST https://katapultpro.com/api/v3/jobs
```

**Token cost:** 10

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `name` | string | ✓ | Name of the job. |
| `model` | string | ✓ | Model of the job (stored on `job_creator`). |
| `map_styles` | string |  | Map style for the job (e.g. `default`). |
| `metadata` | object |  | Flat map of job metadata. |
| `sharing` | object |  | Flat map of company id to permission (`read` or `write`); the owner company is added automatically. See [Sharing](#sharing). |

### Get a job (partial data)

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}
```

**Token cost:** 1

Gets partial job data for the specified job.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `paths` | string | Comma-separated list of data paths to return. Allowed paths: `name`, `job_creator`, `job_owner`, `project_folder`, `project_id`, `status`, `done`, `map_styles`, `metadata`, `sharing`. Omitting this parameter returns only the job `id` (no other data). |

### Update a job

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}
```

**Token cost:** 10

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `name` | string |  | Name of the job. |
| `model` | string |  | Model of the job. |
| `map_styles` | string |  | Map style for the job (e.g. `default`). |
| `metadata` | object |  | Flat map of job metadata. |
| `sharing` | object |  | Flat map of company id to permission (`read` or `write`); the owner company is added automatically. See [Sharing](#sharing). |

### Raw job write

> 🔒 **Restricted** — requires extended API access (disabled in production). See [restricted.md](restricted.md).

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/raw
```

**Token cost:** 10

**Restricted — requires extended API access, which is disabled in production.** Writes raw path/value data directly to a job. Body keys are job-relative paths (e.g. `nodes/{node_id}` or `nodes` for a full replace); values are written as-is, with `null` deleting a path. Allowed top-level keys: `nodes`, `connections`, `photos`, `photo_summary`, `files`, `traces`, `compatible_units`, `warning_reports`. Reserved keys (`metadata`, `name`, `model`, `map_styles`, `sharing`) must use the non-raw update endpoint. See `../reference/restricted.md`.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |

Request body: free-form JSON object (see endpoint description).

### Get job status

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/status
```

**Token cost:** 1

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |

### Update job status

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/status
```

**Token cost:** 10

Updates a job's status. Set `status` to `archived` to archive the job, or `active` to restore an archived job.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `status` | `active` \| `archived` | ✓ | New status for the job. |

<!-- END GENERATED: Jobs -->

## Job object

`GET /jobs/{job_id}` returns **partial** job data — only the fields you request
via the `paths` query parameter. For the complete structure of a job and
everything it contains (nodes, connections, sections, photos and their markers,
traces, and sharing), see the published JSON schema:
[katapultpro.com/schema/job.json](https://katapultpro.com/schema/job.json).

## Listing & incremental updates

`GET /jobs` returns entries ordered by `last_updated` (most recent first), each
carrying a `last_updated` timestamp when one is available. To sync
incrementally, record the newest `last_updated` you have seen and pass it back as
the `last_updated` query parameter (ISO-8601) to receive only jobs changed
**after** that time — the bound is exclusive. Combine with `limit` to page
through large result sets.

Set `list=true` for lightweight list entries; `metadataFilter` does not apply in
that mode. `includeArchived=true` includes archived jobs either way.

## Sharing

`sharing` controls which companies can access a job. It is a flat map of
**company id** to permission level — either `read` or `write`. The owner
company is added automatically, so list only the *other* companies you are
sharing with. Omit `sharing` (or send `{}`) to share the job with the owner
company only.

```json
{
  "name": "Pole audit — Q3",
  "model": "-OModelKey...",
  "sharing": {
    "-OAcmeCompanyId...": "write",
    "-OBetaCompanyId...": "read"
  }
}
```

Any value other than `read` or `write` is invalid.
