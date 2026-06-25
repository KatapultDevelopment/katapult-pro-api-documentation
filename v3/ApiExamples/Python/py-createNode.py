#*********************************************************************************************
#* Name: py-createNode.py
#* Description: Katapult Pro API v3 — Create a node in a job.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Path placeholder — fill in with your own id.
JOB_ID = '<<YOUR_JOB_ID>>'

# Required: latitude, longitude. Optional: attributes, add_attributes.
#   - attributes use the full {name: {instance_id: value}} shape.
#   - add_attributes is a flat {name: value} map (the API picks instance ids).
body = {
    'latitude': 42.8864,
    'longitude': -78.8784,
    'add_attributes': {'node_type': 'pole'},
}

resp = requests.post(f'{URL_PATH}/jobs/{JOB_ID}/nodes', params={'api_key': API_KEY}, json=body)
print('Status:', resp.status_code)
print(resp.json())
