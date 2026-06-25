#*********************************************************************************************
#* Name: py-deleteSection.py
#* Description: Katapult Pro API v3 — Delete a section from a connection.
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

resp = requests.delete(
    f'{URL_PATH}/jobs/{JOB_ID}/connections/{CONNECTION_ID}/sections/{SECTION_ID}',
    params={'api_key': API_KEY},
)
print('Status:', resp.status_code)
print(resp.json())
