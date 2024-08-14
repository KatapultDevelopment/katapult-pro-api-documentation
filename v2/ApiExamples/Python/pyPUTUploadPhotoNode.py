#* Created: 8/1/2024
#* Description: Simple API V2 call to PUT Upload photo to Node.
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
API_Key = "?api_key=sJ3zygFJN_ZU81-3I8w0VLZvFUst_5L-2uuVzXubYbFeAP7vr52VRc1BMlIOQ0bHks1EfMSe8rBYhNHfoec9kBjj9wsYJPXseA8gb1cOhBC6Ne8MVceNs4kz5wiNDuHtECn0tM41pYlMYJ8eSKe75F_Ct4GfWO15sVg2sRGvw5kMfmfnbUEmYd6Cx_a6lAPXcaxW4ZdkRgRajYqKA-58oXYOIKpP9Buna74ZgzYPdAXVTmtE3oKkpUzLUQaLdKtgLzn7JaTkRo_RnFpe54Pwt7GVn8mxtCAAA3nDCqX-FmTi9PcIqwU-Lxoxqm6aUy4Mu4rvSj9adVYRR8qUVwEtog"
JOB_ID = '/-O0AVVbpV-M0Mp8JbVE7'
NODE_ID = '/nodes/-O0AVbHZTCKRGVaXqbP8'
PATH = '/photos'
# Send request with payload

print(URL_PATH + JOB_ID + NODE_ID + PATH + API_Key)
conn.request("PUT", URL_PATH + JOB_ID + NODE_ID + PATH + API_Key , json.dumps(data) , headers)

# Get response
res = conn.getresponse()

# Format data and print
data = res.read()
formatted_json_str = pprint.pformat(data.decode("utf-8"))
pprint.pprint(formatted_json_str)