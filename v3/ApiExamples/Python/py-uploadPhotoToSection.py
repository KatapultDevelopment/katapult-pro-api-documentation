#*********************************************************************************************
#* Name: py-uploadPhotoToSection.py
#* Description: Katapult Pro API v3 — Upload a JPEG photo and associate it to a section.
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

# Optional query param controlling how the photo is associated. Allowed values
# are 'true' (default) or 'main'. Set to None to omit and use the default.
ASSOCIATION_VALUE = 'true'

# Raw JPEG bytes read from a local file.
IMAGE_PATH = 'sample.jpg'

params = {'api_key': API_KEY}
if ASSOCIATION_VALUE is not None:
    params['association_value'] = ASSOCIATION_VALUE

with open(IMAGE_PATH, 'rb') as f:
    image_bytes = f.read()

resp = requests.post(
    f'{URL_PATH}/jobs/{JOB_ID}/connections/{CONNECTION_ID}/sections/{SECTION_ID}/photos',
    params=params,
    headers={'Content-Type': 'image/jpeg'},
    data=image_bytes,
)
print('Status:', resp.status_code)
print(resp.json())
