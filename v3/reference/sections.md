# Sections

Sections (midspan points) on a connection.

> **Note:** Creating a section with `make_midpoint: true` will **overwrite an
> existing midpoint section, deleting all of its data.**

`make_midpoint` and explicit `latitude`/`longitude` are alternative ways to place
a section — see [Complex & codependent parameters](../concepts/complex-parameters.md#creating-a-section-make_midpoint-vs-explicit-coordinates).

<!-- BEGIN GENERATED: Sections -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/connections/{connection_id}/sections`](#get-all-sections-on-a-connection) | TBD | Get all sections on a connection |
| `POST` | [`/jobs/{job_id}/connections/{connection_id}/sections`](#create-a-section) | TBD | Create a section |
| `GET` | [`/jobs/{job_id}/connections/{connection_id}/sections/{section_id}`](#get-a-section) | TBD | Get a section |
| `POST` | [`/jobs/{job_id}/connections/{connection_id}/sections/{section_id}`](#update-a-section) | TBD | Update a section |
| `DELETE` | [`/jobs/{job_id}/connections/{connection_id}/sections/{section_id}`](#delete-a-section) | TBD | Delete a section |
| `POST` | [`/jobs/{job_id}/connections/{connection_id}/sections/{section_id}/photos`](#upload-a-photo-to-a-section) | TBD | Upload a photo to a section |

### Get all sections on a connection

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/connections/{connection_id}/sections
```

**Average token cost:** TBD

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `connection_id` | string | Id of the connection. |

### Create a section

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/connections/{connection_id}/sections
```

**Average token cost:** TBD

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `connection_id` | string | Id of the connection. |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `make_midpoint` | boolean |  | If true, creates the section at the connection's midpoint. **Overwrites an existing midpoint section, deleting its data.** |
| `latitude` | number |  | Latitude of the section in decimal degrees. |
| `longitude` | number |  | Longitude of the section in decimal degrees. |
| `attributes` | object (entity attribute list) |  | Entity attribute list: maps each attribute name to its instance ids and values. Set an attribute or instance to `null` to remove it. See [Working with attributes](../concepts/attributes.md). |
| `add_attributes` | object (flat map) |  | Flat map of attribute name to value; the API generates instance ids for you. See [Working with attributes](../concepts/attributes.md). |

### Get a section

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/connections/{connection_id}/sections/{section_id}
```

**Average token cost:** TBD

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

**Average token cost:** TBD

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
| `latitude` | number |  | Latitude of the section in decimal degrees. |
| `longitude` | number |  | Longitude of the section in decimal degrees. |
| `attributes` | object (entity attribute list) |  | Entity attribute list: maps each attribute name to its instance ids and values. Set an attribute or instance to `null` to remove it. See [Working with attributes](../concepts/attributes.md). |
| `add_attributes` | object (flat map) |  | Flat map of attribute name to value; the API generates instance ids for you. See [Working with attributes](../concepts/attributes.md). |
| `remove_attributes` | array<string> |  | List of attribute names to remove; all instances of each are removed. See [Working with attributes](../concepts/attributes.md). |

### Delete a section

```sh
DELETE https://katapultpro.com/api/v3/jobs/{job_id}/connections/{connection_id}/sections/{section_id}
```

**Average token cost:** TBD

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

**Average token cost:** TBD

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
