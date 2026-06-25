//*********************************************************************************************
//* Name: node-uploadPhotoToSection.js
//* Description: Katapult Pro API v3 — Upload a JPEG photo and associate it to a section.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');
const fs = require('fs');

const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Path placeholders — fill these in with your own ids.
const JOB_ID = '<<YOUR_JOB_ID>>';
const CONNECTION_ID = '<<YOUR_CONNECTION_ID>>';
const SECTION_ID = '<<YOUR_SECTION_ID>>';

// Optional query param controlling how the photo is associated. Allowed values
// are 'true' (default) or 'main'. Set to null to omit and use the default.
const ASSOCIATION_VALUE = 'true';

// Raw JPEG bytes read from a local file.
const IMAGE_PATH = 'sample.jpg';

async function run() {
  try {
    const imageBytes = fs.readFileSync(IMAGE_PATH);
    let url = `${URL_PATH}/jobs/${JOB_ID}/connections/${CONNECTION_ID}/sections/${SECTION_ID}/photos?api_key=${API_KEY}`;
    if (ASSOCIATION_VALUE != null) {
      url += `&association_value=${ASSOCIATION_VALUE}`;
    }
    const response = await axios({
      method: 'post',
      url,
      headers: { 'Content-Type': 'image/jpeg' },
      data: imageBytes,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
