#*********************************************************************************************
#* Name: py-getUserActiveState.py
#* Description: Katapult Pro API v3 — Get a user's active state (their last known path/page).
#* RESTRICTED:  This endpoint requires extended API access, which is DISABLED IN PRODUCTION, and
#*              the 'enable_api_user_state_calls' feature flag enabled for your company.
#*              Calling it without extended access returns an 'extended_access_required' error.
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
    resp = requests.get(f'{URL_PATH}/users/{USER_ID}/active_state', params={'api_key': API_KEY})
    print('Status:', resp.status_code)
    print(resp.json())
    # resp.json()['data'] is None if no active state has been recorded yet, otherwise:
    # { 'last_updated': ..., 'source': 'client' | 'api', 'path': ..., 'page': 'map' | 'photos' }
except requests.RequestException as error:
    print('Error', error)
