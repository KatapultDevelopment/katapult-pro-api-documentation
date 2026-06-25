#*********************************************************************************************
#* Name: py-createPhotoElement.py
#* Description: Katapult Pro API v3 — Create a photo element.
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

# element_type is required. The rest are optional.
body = {
    'element_type': 'pole_top',
    'pixel_selection': {'percentX': 50.0, 'percentY': 25.0},
    'manual_height': '25-6',
    'attributes': {'node_type': 'pole'},
    'parent_id': '<<YOUR_PARENT_ELEMENT_ID>>',
    'trace_id': '<<YOUR_TRACE_ID>>',
}

resp = requests.post(
    f'{URL_PATH}/jobs/{JOB_ID}/photos/{PHOTO_ID}/photo_elements',
    params={'api_key': API_KEY},
    json=body,
)
print('Status:', resp.status_code)
print(resp.json())
