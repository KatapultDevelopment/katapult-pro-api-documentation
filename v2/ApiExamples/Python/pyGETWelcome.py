#* Created: 12/19/2023
#* Description: Simple API V2 call to GET Welcome message.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
#*             errors or omissions in the content of this Katapult API Example. The 
#*             information contained in this software example is provided on an "as is" 
#*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..
#*             Python Version - To run python pyGETWelcome.py
#*********************************************************************************************/
import http.client

conn = http.client.HTTPSConnection("katapultpro.com")
payload = ''
headers = {}

URL_PATH = 'https://katapultpro.com/api/v2'
API_Key = "?api_key=<<API_KEY>>"
# Send request with payload
conn.request("GET", URL_PATH + API_Key , payload, headers)

# Get response
res = conn.getresponse()

# Format data and print
data = res.read()
print(data.decode("utf-8"))

