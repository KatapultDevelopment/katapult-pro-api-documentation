#*********************************************************************************************
#* Name: py-updatePhotoElement.py
#* Description: Katapult Pro API v3 — Update a photo element.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Path placeholders — fill these in with your own ids.
JOB_ID = '<<YOUR_JOB_ID>>'
PHOTO_ID = '<<YOUR_PHOTO_ID>>'
ELEMENT_ID = '<<YOUR_ELEMENT_ID>>'

# Optional: if 'true', the element is only updated if it already exists (no creation).
ONLY_IF_EXISTS = 'true'

# element_type may only be set on create, so it is omitted here.
body = {
    'pixel_selection': {'percentX': 50.0, 'percentY': 25.0},
    'manual_height': '25-6',
    'attributes': {'node_type': 'pole'},
    'parent_id': None,  # Set to None to de-nest.
    'trace_id': '<<YOUR_TRACE_ID>>',
}

resp = requests.post(
    f'{URL_PATH}/jobs/{JOB_ID}/photos/{PHOTO_ID}/photo_elements/{ELEMENT_ID}',
    params={'api_key': API_KEY, 'onlyIfExists': ONLY_IF_EXISTS},
    json=body,
)
print('Status:', resp.status_code)
print(resp.json())
