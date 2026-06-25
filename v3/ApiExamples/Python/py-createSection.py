#*********************************************************************************************
#* Name: py-createSection.py
#* Description: Katapult Pro API v3 — Create a section (midspan point) on a connection.
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

# Optional body fields. Set make_midpoint to True to place the section at the
# connection's midpoint (overwrites an existing midpoint section). Otherwise
# provide latitude/longitude to position it (Buffalo, NY shown here).
body = {
    'make_midpoint': False,
    'latitude': 42.8864,
    'longitude': -78.8784,
    'add_attributes': {'section_label': 'midspan'},
}

resp = requests.post(
    f'{URL_PATH}/jobs/{JOB_ID}/connections/{CONNECTION_ID}/sections',
    params={'api_key': API_KEY},
    json=body,
)
print('Status:', resp.status_code)
print(resp.json())
