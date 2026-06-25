#*********************************************************************************************
#* Name: py-deletePhotoElement.py
#* Description: Katapult Pro API v3 — Delete a photo element.
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

resp = requests.delete(
    f'{URL_PATH}/jobs/{JOB_ID}/photos/{PHOTO_ID}/photo_elements/{ELEMENT_ID}',
    params={'api_key': API_KEY},
)
print('Status:', resp.status_code)
print(resp.json())
