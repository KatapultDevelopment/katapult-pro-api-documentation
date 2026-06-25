#*********************************************************************************************
#* Name: py-getJob.py
#* Description: Katapult Pro API v3 — Get partial job data for a job.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Path placeholder — fill in the id of the job to read.
JOB_ID = '<<YOUR_JOB_ID>>'

# Optional comma-separated list of data paths to return. Allowed paths:
# name, job_creator, job_owner, project_folder, project_id, status, done,
# map_styles, metadata, sharing.
params = {
    'api_key': API_KEY,
    'paths': 'name,status,metadata',
}

try:
    resp = requests.get(f'{URL_PATH}/jobs/{JOB_ID}', params=params)
    print('Status:', resp.status_code)
    print(resp.json())
except requests.RequestException as error:
    print('Error', error)
