#*********************************************************************************************
#* Name: py-updateJob.py
#* Description: Katapult Pro API v3 — Update a job.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Path placeholder — fill in the id of the job to update.
JOB_ID = '<<YOUR_JOB_ID>>'

# Body: include any of name, model, map_styles, metadata, sharing.
body = {
    'name': 'API Example Job (updated)',
    'metadata': {'status': 'done'},
}

try:
    resp = requests.post(f'{URL_PATH}/jobs/{JOB_ID}', params={'api_key': API_KEY}, json=body)
    print('Status:', resp.status_code)
    print(resp.json())
except requests.RequestException as error:
    print('Error', error)
