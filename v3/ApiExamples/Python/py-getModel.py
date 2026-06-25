#*********************************************************************************************
#* Name: py-getModel.py
#* Description: Katapult Pro API v3 — Get model data for a single model.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Path placeholder — replace with the model key you want to fetch. Must not contain '/'.
MODEL_KEY = 'your-model-key'

# Comma-separated list of sub-paths to return (maximum 10), 1000 tokens per path.
# Use `paths` — this is the supported way to read model data. A full model fetch
# (None here / omit `paths`) requires extended API access and returns a
# 403 `extended_access_required` in production, where extended access is off.
PATHS = 'attributes,node_types'

try:
    params = {'api_key': API_KEY}
    if PATHS:
        params['paths'] = PATHS
    resp = requests.get(f'{URL_PATH}/models/{MODEL_KEY}', params=params)
    print('Status:', resp.status_code)
    print(resp.json())
except requests.RequestException as error:
    print('Error', getattr(error.response, 'status_code', None))
    if error.response is not None:
        print(error.response.text)
