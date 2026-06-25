# Resource ID Requirements

You can create resources with your own ids through the POST update endpoints
(e.g. `POST /jobs/{job_id}/nodes/{node_id}` creates the node with that id if it
does not exist). User-defined ids must meet these requirements:

- Alphanumeric (`a-z`, `A-Z`, `0-9`), and may contain dashes (`-`) and
  underscores (`_`).
- Between **20 and 256** characters long.
- Unique within the job.

An id that fails these rules returns HTTP `400` with type `invalid_id`.

**Attribute instance ids** are not subject to the length or uniqueness
requirements, but must still be alphanumeric and may contain dashes and
underscores.
