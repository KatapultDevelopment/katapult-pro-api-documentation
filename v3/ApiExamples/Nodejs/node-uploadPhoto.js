//*********************************************************************************************
//* Name: node-uploadPhoto.js
//* Description: Katapult Pro API v3 — Upload a JPEG photo to a job (without associating it).
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');
const fs = require('fs');
const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Path placeholder — fill in with your own id.
const JOB_ID = '<<YOUR_JOB_ID>>';

// The request body is the raw JPEG bytes read from a local file.
const IMAGE_PATH = 'sample.jpg';

async function run() {
  try {
    const imageBytes = fs.readFileSync(IMAGE_PATH);
    const response = await axios({
      method: 'post',
      url: `${URL_PATH}/jobs/${JOB_ID}/photos?api_key=${API_KEY}`,
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
