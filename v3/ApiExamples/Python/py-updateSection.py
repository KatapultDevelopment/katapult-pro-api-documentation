#*********************************************************************************************
#* Name: py-updateSection.py
#* Description: Katapult Pro API v3 — Update a section on a connection.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Path placeholders — fill these in with your own ids.
JOB_ID = '<<YOUR_JOB_ID>>'
CONNECTION_ID = '<<YOUR_CONNECTION_ID>>'
SECTION_ID = '<<YOUR_SECTION_ID>>'

# Optional query param: if 'true', the section is only updated if it already
# exists (it will not be created). Set to None to omit.
ONLY_IF_EXISTS = 'true'

# Optional body fields. add_attributes adds/overwrites; remove_attributes drops
# attributes by name.
body = {
    'latitude': 42.8864,
    'longitude': -78.8784,
    'add_attributes': {'section_label': 'midspan'},
    'remove_attributes': ['old_label'],
}

params = {'api_key': API_KEY}
if ONLY_IF_EXISTS is not None:
    params['onlyIfExists'] = ONLY_IF_EXISTS

resp = requests.post(
    f'{URL_PATH}/jobs/{JOB_ID}/connections/{CONNECTION_ID}/sections/{SECTION_ID}',
    params=params,
    json=body,
)
print('Status:', resp.status_code)
print(resp.json())
