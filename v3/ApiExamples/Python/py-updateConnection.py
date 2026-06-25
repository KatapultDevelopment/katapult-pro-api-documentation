#*********************************************************************************************
#* Name: py-updateConnection.py
#* Description: Katapult Pro API v3 — Update a connection (creates it if it does not exist,
#*              unless onlyIfExists=true).
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Fill in the ids of the job and connection, plus the node ids the connection spans.
JOB_ID = '<<YOUR_JOB_ID>>'
CONNECTION_ID = '<<YOUR_CONNECTION_ID>>'
NODE_ID_1 = '<<YOUR_NODE_ID_1>>'
NODE_ID_2 = '<<YOUR_NODE_ID_2>>'

# Optional query param: 'true' updates only if the connection already exists (no creation).
ONLY_IF_EXISTS = 'true'

# All body fields are optional: node_id_1, node_id_2, attributes, add_attributes,
# remove_attributes.
body = {
    'node_id_1': NODE_ID_1,
    'node_id_2': NODE_ID_2,
    'add_attributes': {'connection_type': 'aerial cable'},
    'remove_attributes': ['note'],
}

try:
    resp = requests.post(
        f'{URL_PATH}/jobs/{JOB_ID}/connections/{CONNECTION_ID}',
        params={'api_key': API_KEY, 'onlyIfExists': ONLY_IF_EXISTS},
        json=body,
    )
    print('Status:', resp.status_code)
    print(resp.json())
except Exception as error:
    print('Error:', error)
