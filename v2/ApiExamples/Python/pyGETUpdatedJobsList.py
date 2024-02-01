#* Created: 2/1/2024
#* Description: Simple API V2 call to GET Updated Jobs List.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
#*             errors or omissions in the content of this Katapult API Example. The 
#*             information contained in this software example is provided on an "as is" 
#*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..
#*             Python Version - To run python pyGETPartialJobData.py
#*********************************************************************************************/
import http.client
import json
import pprint

conn = http.client.HTTPSConnection("katapultpro.com")
payload = ''
headers = {}

URL_PATH = 'https://katapultpro.com/api/v2/updatedJobsList'
FROM_DATE = '?fromDate=2023-11-28T18:09:07.282Z'
TO_DATE = '&toDate=11/29/23'
USE_TODAY = '&useToday=true'
PAGE_NUM = '&page=1'
API_Key = "&api_key={{API_KEY}}"
# Send request with payload
conn.request("GET", URL_PATH + FROM_DATE + TO_DATE + USE_TODAY + PAGE_NUM + API_Key , payload, headers)

# Get response
res = conn.getresponse()

# Format data and print
data = res.read()
formatted_json_str = pprint.pformat(data.decode("utf-8"))
pprint.pprint(formatted_json_str)