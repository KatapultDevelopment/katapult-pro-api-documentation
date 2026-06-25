#*********************************************************************************************
#* Name: py-createJob.py
#* Description: Katapult Pro API v3 — Create a job.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Body: name and model are required; map_styles, metadata, and sharing are optional.
body = {
    'name': 'API Example Job',
    'model': 'your-model-name',
    'metadata': {'city': 'Buffalo', 'status': 'in_progress'},
    'sharing': {},
}

try:
    resp = requests.post(f'{URL_PATH}/jobs', params={'api_key': API_KEY}, json=body)
    print('Status:', resp.status_code)
    print(resp.json())
except requests.RequestException as error:
    print('Error', error)
