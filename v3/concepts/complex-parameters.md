# Complex & Codependent Parameters

Some endpoints have parameters that interact — where one field's meaning depends
on another, where fields are mutually exclusive, or where a field changes
whether a resource is created or updated. This page gives worked examples for
those cases. For the mechanics of attribute lists generally, see
[Working with attributes](attributes.md); for ids, see
[Resource ID requirements](resource-ids.md).

## Associating a photo (node vs section vs unassociate)

[`POST /jobs/{job_id}/photos/{photo_id}/associate`](../reference/photos.md#associate-a-photo-to-an-item)
has codependent body fields. `association_value` is always required, and you
target **either** a node **or** a section — never both:

- **To a node:** provide `node_id`; omit `connection_id` and `section_id`.
- **To a section:** provide **both** `connection_id` and `section_id`; omit
  `node_id`.
- **`association_value`** is `true`, `'main'`, or `null`. `null` **unassociates**
  the photo from the item. (`false` is not accepted.)

Associate to a node as the main photo:

```json
{ "node_id": "-No_DeAbc12345678901", "association_value": "main" }
```

Associate to a section (needs the connection it lives on):

```json
{
  "connection_id": "-Co_NnAbc12345678901",
  "section_id": "-Se_CtAbc12345678901",
  "association_value": true
}
```

Unassociate the photo from a node:

```json
{ "node_id": "-No_DeAbc12345678901", "association_value": null }
```

Invalid — mixing a node with a section target:

```json
{ "node_id": "...", "section_id": "...", "association_value": true }
```

> Returns `400 invalid_request`: `node_id` cannot be combined with
> `connection_id`/`section_id`, and `connection_id`/`section_id` must be sent
> together.

## The attribute trio: `remove_attributes`, `attributes`, `add_attributes`

On node/connection/section writes you can combine all three attribute fields in
a single request. They are **applied in this order**: `remove_attributes` →
`attributes` → `add_attributes`. (Full semantics in
[Working with attributes](attributes.md).)

- `remove_attributes` — list of attribute names; removes **all** instances of each.
- `attributes` — a partial entity attribute list (the nested
  `{ name: { instance_id: value } }` shape) for precise, instance-level edits;
  `null` removes a name or instance.
- `add_attributes` — flat `{ name: value }` map; the API generates instance ids.

Combined example on `POST /jobs/{job_id}/nodes/{node_id}`:

```json
{
  "remove_attributes": ["scid"],
  "attributes": {
    "node_type": { "-OInst0123456789abcd": "reference" }
  },
  "add_attributes": {
    "note": "verified in field"
  }
}
```

This removes every `scid` instance, updates one specific `node_type` instance,
then adds a new `note` instance — in that order. Updating a specific instance
requires knowing its `instance_id`; if you only want one value per attribute,
prefer `add_attributes` (create) and `remove_attributes` (clear).

## Creating a section: `make_midpoint` vs explicit coordinates

On [`POST .../sections`](../reference/sections.md#create-a-section), `make_midpoint`
and explicit `latitude`/`longitude` are alternative ways to place the section:

- `make_midpoint: true` — places the section at the connection's computed
  midpoint; you do **not** supply coordinates. **Overwrites an existing midpoint
  section and deletes its data.**
- Omit `make_midpoint` (or set it false) and supply `latitude`/`longitude` to
  place the section yourself.

Midpoint:

```json
{ "make_midpoint": true, "add_attributes": { "note": "midspan point" } }
```

Explicit location:

```json
{ "latitude": 42.8867, "longitude": -78.8777 }
```

## Create-or-update and `onlyIfExists`

The `POST .../{id}` update endpoints (nodes, connections, sections, photo
elements, calibration anchors, traces) **create the resource with the id in the
URL if it does not exist**, otherwise update it. The `onlyIfExists` query
parameter controls that:

- `onlyIfExists=true` — update only; if the id does not exist, returns
  `404 not_found` instead of creating.
- omitted / `false` — upsert: create the resource at that id if missing.

When a create happens this way, the id you supply must meet the
[Resource ID requirements](resource-ids.md) (20–256 chars, alphanumeric plus
`-`/`_`); otherwise you get `400 invalid_id`. Some fields are **create-only** —
e.g. a photo element's `element_type` may be set when the element is created but
not when updating an existing one.

```sh
# Update only — fails with 404 if the node id doesn't already exist:
curl -X POST "https://katapultpro.com/api/v3/jobs/JOB/nodes/NODE?api_key=KEY&onlyIfExists=true" \
  -H "Content-Type: application/json" -d '{ "latitude": 42.8864, "longitude": -78.8784 }'
```

## Fetching model data: full vs `paths`

[`GET /models/{modelKey}`](../reference/models.md) behaves — and is priced —
differently based on `paths`:

- **No `paths`** → returns the **full** model. This **requires extended API
  access** (otherwise `403 extended_access_required`) and, because extended
  access is off in production, is **unavailable on `katapultpro.com`**. When
  permitted, it costs **9,900 tokens** (nearly the entire default bucket).
- **With `paths`** (comma-separated, **max 10**) → returns only those sub-paths
  and costs **1,000 tokens per path**. Open to all callers — the supported route
  for most integrations.

Prefer `paths` whenever you need only part of a model. See
[Rate limits & the token bucket](../rate-limits.md#token-costs).

```sh
# 2 paths -> 2,000 tokens, instead of 9,900 for the whole model:
curl "https://katapultpro.com/api/v3/models/MODEL_KEY?api_key=KEY&paths=attributes,button_groups"
```

## Nesting photo elements: `parent_id` and `trace_id`

When creating a [photo element](../reference/photo-elements.md), `parent_id`
nests it under another element, and `trace_id` adds it to a trace. On update,
set `parent_id` to `null` to de-nest. `pixel_selection` may only be set on
top-level (un-nested) elements.
