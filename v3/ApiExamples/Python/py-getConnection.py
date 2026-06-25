#*********************************************************************************************
#* Name: py-getConnection.py
#* Description: Katapult Pro API v3 — Get a connection (and its sections).
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Fill in the ids of the job and the connection you want to read.
JOB_ID = '<<YOUR_JOB_ID>>'
CONNECTION_ID = '<<YOUR_CONNECTION_ID>>'

try:
    resp = requests.get(
        f'{URL_PATH}/jobs/{JOB_ID}/connections/{CONNECTION_ID}',
        params={'api_key': API_KEY},
    )
    print('Status:', resp.status_code)
    print(resp.json())
except Exception as error:
    print('Error:', error)
