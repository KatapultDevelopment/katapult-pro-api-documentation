#*********************************************************************************************
#* Name: py-uploadPhoto.py
#* Description: Katapult Pro API v3 — Upload a JPEG photo to a job (without associating it).
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Path placeholder — fill in with your own id.
JOB_ID = '<<YOUR_JOB_ID>>'

# The request body is the raw JPEG bytes read from a local file.
IMAGE_PATH = 'sample.jpg'

with open(IMAGE_PATH, 'rb') as f:
    image_bytes = f.read()

resp = requests.post(
    f'{URL_PATH}/jobs/{JOB_ID}/photos',
    params={'api_key': API_KEY},
    headers={'Content-Type': 'image/jpeg'},
    data=image_bytes,
)
print('Status:', resp.status_code)
print(resp.json())
