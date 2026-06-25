# Working with Attributes

How attributes are structured and modified differs between entity types.

## Nodes, Connections, and Sections

Nodes, connections, and sections store their attributes as an **entity
attribute list**: a JSON object mapping attribute names to a map of instance
ids to values:

```ts
type EntityAttributeList = {
  [attribute_name: string]: {
    [instance_id: string]: any // Value of this attribute instance
  }
}
```

That is, each attribute may hold multiple values, keyed by `instance_id`:

```json
{
  "node_type": { "-OPWRGCw7wC7DA3Lt6SX": "pole" },
  "scid": { "-OPWRQOwUdDU4X4f_-8u": "001" },
  "note": {
    "-OPWRVKh0JHKTnZrY8O5": "This is a note",
    "-OPWRVYCKdxh34WoQXAv": "This is another note"
  }
}
```

The one-to-many relationship makes entity attribute lists a bit more complex, so
**Katapult recommends setting only one value per attribute when possible.** The
API provides convenience fields on POST requests for common operations.

### `add_attributes` — add without instance ids

A flat map of attribute names to values; the API generates instance ids for you:

```json
{ "add_attributes": { "node_type": "pole", "scid": "001" } }
```

### `remove_attributes` — remove by name

A list of attribute names; **all** instances of each are removed:

```json
{ "remove_attributes": ["node_type", "scid"] }
```

### `attributes` — precise updates

A partial entity attribute list. Behaviors:

- Attributes not specified are left unchanged.
- If an instance id is specified, that instance's value is updated.
- Setting an attribute name or instance id to `null` removes it.

```json
{
  "attributes": {
    "node_type": { "-OPWRGCw7wC7DA3Lt6SX": "reference" },
    "scid": null,
    "note": { "-OPWRVYCKdxh34WoQXAv": null }
  }
}
```

This updates the `node_type` instance, removes the `scid` attribute entirely,
and removes one `note` instance. **You must know the instance id to update a
specific instance.**

`remove_attributes`, `attributes`, and `add_attributes` may be combined in one
request; they are applied in that order.

## Jobs

Job attributes live under `metadata` and are a flat map (at most one value per
attribute):

```ts
type JobMetadata = { [attribute_name: string]: any }
```

Use the `metadata` field on POST requests to add, update, or remove:

```json
{ "metadata": { "description": "A description of the job", "contact_number": null } }
```

This adds/updates `description` and removes `contact_number`.

## Photo Elements and Traces

Photo elements and traces also store attributes as a flat map, updated the same
way as job attributes. However, their attributes are **not** nested under a
`metadata` or `attributes` field — they are stored directly on the element or
trace object. Read an attribute you've set by reading the property directly from
the root of the object.
