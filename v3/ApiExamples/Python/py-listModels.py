#*********************************************************************************************
#* Name: py-listModels.py
#* Description: Katapult Pro API v3 — Get model options (list the caller's available models).
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Token cost: 100 tokens per request.
try:
    resp = requests.get(f'{URL_PATH}/models', params={'api_key': API_KEY})
    print('Status:', resp.status_code)
    print(resp.json())
except requests.RequestException as error:
    print('Error', getattr(error.response, 'status_code', None))
    if error.response is not None:
        print(error.response.text)
