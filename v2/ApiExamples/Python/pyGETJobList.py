#* Created: 1/5/2024
#* Description: Simple API V2 call to GET Job List.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
#*             errors or omissions in the content of this Katapult API Example. The 
#*             information contained in this software example is provided on an "as is" 
#*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..
#*             Python Version - To run python pyGETJobList.py
#*********************************************************************************************/
import http.client
import json
import pprint

conn = http.client.HTTPSConnection("katapultpro.com")
payload = ''
headers = {}

URL_PATH = 'https://katapultpro.com/api/v2/jobs'
API_Key = "?api_key={{API_KEY}}"
# Send request with payload
conn.request("GET", URL_PATH + API_Key , payload, headers)

# Get response
res = conn.getresponse()

# Format data and print
data = res.read()
formatted_json_str = pprint.pformat(data.decode("utf-8"))
pprint.pprint(formatted_json_str)