#*********************************************************************************************
#* Name: py-listNodes.py
#* Description: Katapult Pro API v3 — Get all nodes in a job.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Path placeholder — fill in with your own id.
JOB_ID = '<<YOUR_JOB_ID>>'

resp = requests.get(f'{URL_PATH}/jobs/{JOB_ID}/nodes', params={'api_key': API_KEY})
print('Status:', resp.status_code)
print(resp.json())
