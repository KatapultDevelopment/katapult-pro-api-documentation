//*********************************************************************************************
//* Name: node-updateCalibrationAnchor.js
//* Description: Katapult Pro API v3 — Update a calibration anchor.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');

const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Path placeholders — fill these in with your own ids.
const JOB_ID = '<<YOUR_JOB_ID>>';
const PHOTO_ID = '<<YOUR_PHOTO_ID>>';
const ANCHOR_ID = '<<YOUR_ANCHOR_ID>>';

// Optional: if "true", the anchor is only updated if it already exists (no creation).
const ONLY_IF_EXISTS = 'true';

// Adding or modifying anchor calibration points un-calibrates the photo (removes
// stick_align). Viewing the photo in Katapult Pro recalibrates it from the points.
// pixel_selection is the anchor location as a percentage of the photo's width/height.
// height is in decimal feet.
const body = {
  pixel_selection: { percentX: 50.0, percentY: 25.0 },
  height: 25.5,
};

async function run() {
  try {
    const response = await axios({
      method: 'post',
      url: `${URL_PATH}/jobs/${JOB_ID}/photos/${PHOTO_ID}/calibration_anchors/${ANCHOR_ID}?api_key=${API_KEY}&onlyIfExists=${ONLY_IF_EXISTS}`,
      data: body,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
