#*********************************************************************************************
#* Name: py-getPhotoUrl.py
#* Description: Katapult Pro API v3 — Get a signed, 7-day photo download URL.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Path placeholders — fill in with your own ids.
JOB_ID = '<<YOUR_JOB_ID>>'
PHOTO_ID = '<<YOUR_PHOTO_ID>>'

# Optional query params. file_size defaults to 'full', file_type defaults to 'webp'.
params = {
    'api_key': API_KEY,
    'file_size': 'full',
    'file_type': 'webp',
}

resp = requests.get(f'{URL_PATH}/jobs/{JOB_ID}/photos/{PHOTO_ID}/url', params=params)
print('Status:', resp.status_code)
print(resp.json())
