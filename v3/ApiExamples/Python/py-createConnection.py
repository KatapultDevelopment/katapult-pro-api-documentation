#*********************************************************************************************
#* Name: py-createConnection.py
#* Description: Katapult Pro API v3 — Create a connection (span) between two nodes in a job.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Fill in the id of the job and the two node ids the connection spans between.
JOB_ID = '<<YOUR_JOB_ID>>'
NODE_ID_1 = '<<YOUR_NODE_ID_1>>'
NODE_ID_2 = '<<YOUR_NODE_ID_2>>'

# node_id_1 and node_id_2 are required. attributes / add_attributes are optional.
body = {
    'node_id_1': NODE_ID_1,
    'node_id_2': NODE_ID_2,
    'add_attributes': {'connection_type': 'aerial cable'},
}

try:
    resp = requests.post(
        f'{URL_PATH}/jobs/{JOB_ID}/connections',
        params={'api_key': API_KEY},
        json=body,
    )
    print('Status:', resp.status_code)
    print(resp.json())
except Exception as error:
    print('Error:', error)
