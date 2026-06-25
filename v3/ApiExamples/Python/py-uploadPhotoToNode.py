#*********************************************************************************************
#* Name: py-uploadPhotoToNode.py
#* Description: Katapult Pro API v3 — Upload a JPEG photo and associate it to a node.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Path placeholders — fill in with your own ids.
JOB_ID = '<<YOUR_JOB_ID>>'
NODE_ID = '<<YOUR_NODE_ID>>'

# Optional query: how to associate the photo. 'true' (default) or 'main'.
ASSOCIATION_VALUE = 'main'

# Send the raw JPEG bytes from a local file with Content-Type: image/jpeg.
with open('sample.jpg', 'rb') as f:
    image_bytes = f.read()

resp = requests.post(
    f'{URL_PATH}/jobs/{JOB_ID}/nodes/{NODE_ID}/photos',
    params={'api_key': API_KEY, 'association_value': ASSOCIATION_VALUE},
    headers={'Content-Type': 'image/jpeg'},
    data=image_bytes,
)
print('Status:', resp.status_code)
print(resp.json())
