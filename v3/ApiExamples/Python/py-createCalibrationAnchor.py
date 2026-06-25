#*********************************************************************************************
#* Name: py-createCalibrationAnchor.py
#* Description: Katapult Pro API v3 — Create a calibration anchor.
#* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
#*             or omissions in the content of this Katapult API Example.
#* Setup: pip install requests
#*********************************************************************************************
import requests

URL_PATH = 'https://katapultpro.com/api/v3'
API_KEY = '<<YOUR_API_KEY>>'

# Path placeholders — fill these in with your own ids.
JOB_ID = '<<YOUR_JOB_ID>>'
PHOTO_ID = '<<YOUR_PHOTO_ID>>'

# Adding or modifying anchor calibration points un-calibrates the photo (removes
# stick_align). Viewing the photo in Katapult Pro recalibrates it from the points.
# pixel_selection is the anchor location as a percentage of the photo's width/height.
# height is in decimal feet.
body = {
    'pixel_selection': {'percentX': 50.0, 'percentY': 25.0},
    'height': 25.5,
}

resp = requests.post(
    f'{URL_PATH}/jobs/{JOB_ID}/photos/{PHOTO_ID}/calibration_anchors',
    params={'api_key': API_KEY},
    json=body,
)
print('Status:', resp.status_code)
print(resp.json())
