#*********************************************************************************************
#* Name: py-updateTrace.py
#* Description: Katapult Pro API v3 — Update a trace (creates it if it does not exist,
#*              unless onlyIfExists=true).
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Fill in the ids of the job and the trace you want to update.
JOB_ID = '<<YOUR_JOB_ID>>'
TRACE_ID = '<<YOUR_TRACE_ID>>'

# Optional query param: 'true' updates only if the trace already exists (no creation).
ONLY_IF_EXISTS = 'true'

# Both body fields are optional: trace_type and attributes (a flat map of attribute
# names to single values).
body = {
    'trace_type': 'cable',
    'attributes': {'cable_type': 'secondary', 'owner': 'electric'},
}

try:
    resp = requests.post(
        f'{URL_PATH}/jobs/{JOB_ID}/traces/{TRACE_ID}',
        params={'api_key': API_KEY, 'onlyIfExists': ONLY_IF_EXISTS},
        json=body,
    )
    print('Status:', resp.status_code)
    print(resp.json())
except Exception as error:
    print('Error:', error)
