#* Created: 12/19/2023
#* Description: Simple API V2 call to GET Welcome message.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
#*             errors or omissions in the content of this Katapult API Example. The 
#*             information contained in this software example is provided on an "as is" 
#*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..
#*             Python Version - To run python pythonGETWelcome.py
#*********************************************************************************************/
import http.client

conn = http.client.HTTPSConnection("katapultpro.com")
payload = ''
headers = {}

URL_PATH = 'https://katapultpro.com/api/v2'
API_Key = "?api_key=qAgRiXGKu7wrvsgoUIaZFAfXMDmdtN3F05EPVt6if1Ol84oUiUiSgC9JNL_FhlSHLte5MH-ymaKaQ3ctye687DmE0JqPZw2xMLoH2wlGyKlqMVmhjxoqdzRYBJMHw7CYwsLQ63_2W57ksY3PZQ4IVclnk4lP6Kug6s-0o5xDStrtpBdAmysnejSKEhZkHTdkg5oOYrcQ6EItF95dkCdOVms8acN_xl6i4C-nqzXU5LDSHIcVv6soOJGMpvCWQ7swIJabsJRNnHgt-cBy1WdMUlAp0s9HSOhVHdIBJWGKPPkk9DMWHuvfOEszVdepnC-7OdwwLUMybY3a21HkfPHv5g"
# Send request with payload
conn.request("GET", URL_PATH + API_Key , payload, headers)

# Get response
res = conn.getresponse()

# Format data and print
data = res.read()
print(data.decode("utf-8"))

