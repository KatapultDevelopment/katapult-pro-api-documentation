#* Created: 8/1/2024
#* Description: Simple API V2 call to PUT Upload photo to Section.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
#*             errors or omissions in the content of this Katapult API Example. The 
#*             information contained in this software example is provided on an "as is" 
#*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..
#*             Python Version - To run python pyGETJobData.py
#*********************************************************************************************/
import http.client
import json
import pprint

conn = http.client.HTTPSConnection("katapultpro.com")
data = 'Cat03.jpg'

headers = {"content-type": "image/jpeg"}

URL_PATH = 'https://training.katapultpro.com/api/v2/jobs'
API_Key = "?api_key={{API_KEY}}"
JOB_ID = '/-O0AVVbpV-M0Mp8JbVE7'
CONNECTION_ID = '/connections/-O4H3Zm036Kg8B3urjeV'
SECTION_ID = '/sections/-O4H42xVu0bR_oBjSAWK'
PATH = '/photos'
# Send request with payload

conn.request("PUT", URL_PATH + JOB_ID + CONNECTION_ID + SECTION_ID + PATH + API_Key , json.dumps(data) , headers)

# Get response
res = conn.getresponse()

# Format data and print
data = res.read()
formatted_json_str = pprint.pformat(data.decode("utf-8"))
pprint.pprint(formatted_json_str)