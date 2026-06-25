#*********************************************************************************************
#* Name: py-listJobs.py
#* Description: Katapult Pro API v3 — List all jobs accessible to the requester.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Optional query parameters.
# includeArchived: 'true' to include archived jobs (default returns active only).
# metadataFilter: '{attribute}:{value}' filters, comma-separated (e.g. 'city:Buffalo,status:done').
params = {
    'api_key': API_KEY,
    'includeArchived': 'true',
    'metadataFilter': 'city:Buffalo',
}

try:
    resp = requests.get(f'{URL_PATH}/jobs', params=params)
    print('Status:', resp.status_code)
    print(resp.json())
except requests.RequestException as error:
    print('Error', error)
