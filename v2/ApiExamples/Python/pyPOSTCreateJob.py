#* Created: 8/1/2024
#* Description: Simple API V2 call to POST Create Node.
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
data = {
    "name" : "<<Job Name>>",
    "mapStyles" : "<<Map Style>>",
    "model" : "<<Model name>>"
}


headers = {"content-type": "application/json"}

URL_PATH = 'https://training.katapultpro.com/api/v2/jobs'
API_Key = "?api_key=<<API_KEY>>"
# Send request with payload

conn.request("POST", URL_PATH  + API_Key , json.dumps(data) , headers)

# Get response
res = conn.getresponse()

# Format data and print
data = res.read()
formatted_json_str = pprint.pformat(data.decode("utf-8"))
pprint.pprint(formatted_json_str)