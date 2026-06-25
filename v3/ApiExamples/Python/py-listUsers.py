#*********************************************************************************************
#* Name: py-listUsers.py
#* Description: Katapult Pro API v3 — List all users in the caller's active company.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

try:
    resp = requests.get(f'{URL_PATH}/users', params={'api_key': API_KEY})
    print('Status:', resp.status_code)
    print(resp.json())
except requests.RequestException as error:
    print('Error', error)
