#*********************************************************************************************
#* Name: py-associatePhoto.py
#* Description: Katapult Pro API v3 — Associate a photo to a node or section (or unassociate).
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Path placeholders — fill in with your own ids.
JOB_ID = '<<YOUR_JOB_ID>>'
PHOTO_ID = '<<YOUR_PHOTO_ID>>'
NODE_ID = '<<YOUR_NODE_ID>>'

# association_value is required: 'main', True, or None (to unassociate).
# Provide node_id to associate to a node, OR connection_id + section_id for a section.
body = {
    'node_id': NODE_ID,
    'association_value': 'main',
}

# To associate to a section instead of a node, use a body like:
# body = {
#     'connection_id': '<<YOUR_CONNECTION_ID>>',
#     'section_id': '<<YOUR_SECTION_ID>>',
#     'association_value': True,
# }
#
# To UNASSOCIATE the photo from the item, set association_value to None
# (keep the same node_id, or connection_id + section_id):
# body = { 'node_id': NODE_ID, 'association_value': None }
#
# Codependency rules (node XOR section, accepted values) are documented in
# ../../concepts/complex-parameters.md#associating-a-photo-node-vs-section-vs-unassociate

resp = requests.post(
    f'{URL_PATH}/jobs/{JOB_ID}/photos/{PHOTO_ID}/associate',
    params={'api_key': API_KEY},
    json=body,
)
print('Status:', resp.status_code)
print(resp.json())
