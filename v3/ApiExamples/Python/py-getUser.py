#*********************************************************************************************
#* Name: py-getUser.py
#* Description: Katapult Pro API v3 — Get a single user's core fields plus their attributes (metadata).
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Path placeholder — fill in with your own id.
USER_ID = '<<YOUR_USER_ID>>'

try:
    resp = requests.get(f'{URL_PATH}/users/{USER_ID}', params={'api_key': API_KEY})
    print('Status:', resp.status_code)
    print(resp.json())
except requests.RequestException as error:
    print('Error', error)
