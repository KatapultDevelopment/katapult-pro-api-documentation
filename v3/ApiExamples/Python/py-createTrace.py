#*********************************************************************************************
#* Name: py-createTrace.py
#* Description: Katapult Pro API v3 — Create a trace in a job.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Fill in the id of the job where the trace will be created.
JOB_ID = '<<YOUR_JOB_ID>>'

# Body: trace_type is required; attributes is an optional flat map of attribute
# names to single values.
body = {
    'trace_type': 'cable',
    'attributes': {'cable_type': 'primary', 'owner': 'electric'},
}

try:
    resp = requests.post(
        f'{URL_PATH}/jobs/{JOB_ID}/traces',
        params={'api_key': API_KEY},
        json=body,
    )
    print('Status:', resp.status_code)
    print(resp.json())
except Exception as error:
    print('Error:', error)
