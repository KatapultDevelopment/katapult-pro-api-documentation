#*********************************************************************************************
#* Name: py-updateNode.py
#* Description: Katapult Pro API v3 — Update (or create) a node in a job.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Path placeholders — fill in with your own ids.
JOB_ID = '<<YOUR_JOB_ID>>'
NODE_ID = '<<YOUR_NODE_ID>>'

# Optional query: if 'true', only update an existing node (never create one).
ONLY_IF_EXISTS = 'true'

# All body fields are optional for an update.
#   - attributes use the full {name: {instance_id: value}} shape.
#   - add_attributes is a flat {name: value} map.
#   - remove_attributes is a list of attribute names to remove.
body = {
    'latitude': 42.8864,
    'longitude': -78.8784,
    'add_attributes': {'node_type': 'pole'},
    'remove_attributes': ['note'],
}

resp = requests.post(
    f'{URL_PATH}/jobs/{JOB_ID}/nodes/{NODE_ID}',
    params={'api_key': API_KEY, 'onlyIfExists': ONLY_IF_EXISTS},
    json=body,
)
print('Status:', resp.status_code)
print(resp.json())
