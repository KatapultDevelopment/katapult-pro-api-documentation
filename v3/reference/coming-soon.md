# Coming Soon

These endpoints and fields are reserved but **not yet implemented**. The routes
that exist today return HTTP `501` with `{ "error": "NOT IMPLEMENTED" }`. They
are listed so you can anticipate them; shapes are **not final** and may change
before release. No code examples are provided yet.

## Duplicate a job

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/duplicate
```

Will create a copy of a job, optionally transferring the copy to another
company.

## Transfer a job

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/transfer
```

Will transfer ownership of a job to another company.

## Attribute History

```sh
GET https://katapultpro.com/api/v3/attribute_history
GET https://katapultpro.com/api/v3/attribute_history/{record_id}
```

Will query the history of attribute changes, with filters for job, node,
connection, section, attribute, user, date range, and pagination.

## Companies

```sh
GET https://katapultpro.com/api/v3/companies/{company_id}
GET https://katapultpro.com/api/v3/companies/{company_id}/users
GET https://katapultpro.com/api/v3/companies/{company_id}/users/{user_id}
```

Will return company details and company-scoped users. The implemented
company-scoped endpoints (tracked actions and action models) are documented in
[companies.md](companies.md).

## Trace markers

A `markers` field (an array of marker ids) on trace create/update is planned but
not yet available.
