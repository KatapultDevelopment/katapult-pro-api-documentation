# Sections

Sections (midspan points) on a connection.

> **Note:** Creating a section with `make_midpoint: true` will **overwrite an
> existing midpoint section, deleting all of its data.**

`make_midpoint` and explicit `latitude`/`longitude` are alternative ways to place
a section — see [Complex & codependent parameters](../concepts/complex-parameters.md#creating-a-section-make_midpoint-vs-explicit-coordinates).

<!-- BEGIN GENERATED: Sections -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/connections/{connection_id}/sections`](#get-all-sections-on-a-connection) | 1 | Get all sections on a connection |
| `POST` | [`/jobs/{job_id}/connections/{connection_id}/sections`](#create-a-section) | 10 | Create a section |
| `GET` | [`/jobs/{job_id}/connections/{connection_id}/sections/{section_id}`](#get-a-section) | 1 | Get a section |
| `POST` | [`/jobs/{job_id}/connections/{connection_id}/sections/{section_id}`](#update-a-section) | 10 | Update a section |
| `DELETE` | [`/jobs/{job_id}/connections/{connection_id}/sections/{section_id}`](#delete-a-section) | 10 | Delete a section |
| `POST` | [`/jobs/{job_id}/connections/{connection_id}/sections/{section_id}/photos`](#upload-a-photo-to-a-section) | 10 | Upload a photo to a section |

### Get all sections on a connection

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/connections/{connection_id}/sections
```

**Token cost:** 1

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `connection_id` | string | Id of the connection. |

### Create a section

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/connections/{connection_id}/sections
```

**Token cost:** 10

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `connection_id` | string | Id of the connection. |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `make_midpoint` | boolean |  | If true, creates the section at the connection's midpoint. **Overwrites an existing midpoint section, deleting its data.** |
| `latitude` | number |  |  |
| `longitude` | number |  |  |
| `attributes` | object (entity attribute list) |  |  |
| `add_attributes` | object (flat map) |  |  |

### Get a section

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/connections/{connection_id}/sections/{section_id}
```

**Token cost:** 1

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `connection_id` | string | Id of the connection. |
| `section_id` | string | Id of the section. |

### Update a section

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/connections/{connection_id}/sections/{section_id}
```

**Token cost:** 10

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `connection_id` | string | Id of the connection. |
| `section_id` | string | Id of the section. |

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

### Delete a section

```sh
DELETE https://katapultpro.com/api/v3/jobs/{job_id}/connections/{connection_id}/sections/{section_id}
```

**Token cost:** 10

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `connection_id` | string | Id of the connection. |
| `section_id` | string | Id of the section. |

### Upload a photo to a section

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/connections/{connection_id}/sections/{section_id}/photos
```

**Token cost:** 10

Uploads a JPEG and associates it to the specified section.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `connection_id` | string | Id of the connection. |
| `section_id` | string | Id of the section. |

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `association_value` | `true` \| `main` | How to associate the uploaded photo. Defaults to `true`. |

Request body: raw `image/jpeg` bytes.

<!-- END GENERATED: Sections -->
