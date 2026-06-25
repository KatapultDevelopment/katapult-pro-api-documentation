//*********************************************************************************************
//* Name: node-updatePhotoElement.js
//* Description: Katapult Pro API v3 — Update a photo element.
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
const ELEMENT_ID = '<<YOUR_ELEMENT_ID>>';

// Optional: if "true", the element is only updated if it already exists (no creation).
const ONLY_IF_EXISTS = 'true';

// element_type may only be set on create, so it is omitted here.
const body = {
  pixel_selection: { percentX: 50.0, percentY: 25.0 },
  manual_height: '25-6',
  attributes: { node_type: 'pole' },
  parent_id: null, // Set to null to de-nest.
  trace_id: '<<YOUR_TRACE_ID>>',
};

async function run() {
  try {
    const response = await axios({
      method: 'post',
      url: `${URL_PATH}/jobs/${JOB_ID}/photos/${PHOTO_ID}/photo_elements/${ELEMENT_ID}?api_key=${API_KEY}&onlyIfExists=${ONLY_IF_EXISTS}`,
      data: body,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
