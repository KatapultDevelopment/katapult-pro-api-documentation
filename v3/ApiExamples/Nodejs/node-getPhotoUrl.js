//*********************************************************************************************
//* Name: node-getPhotoUrl.js
//* Description: Katapult Pro API v3 — Get a signed, 7-day photo download URL.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');
const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Path placeholders — fill in with your own ids.
const JOB_ID = '<<YOUR_JOB_ID>>';
const PHOTO_ID = '<<YOUR_PHOTO_ID>>';

// Optional query params. file_size defaults to 'full', file_type defaults to 'webp'.
const FILE_SIZE = 'full';
const FILE_TYPE = 'webp';

async function run() {
  try {
    const response = await axios({
      method: 'get',
      url: `${URL_PATH}/jobs/${JOB_ID}/photos/${PHOTO_ID}/url`,
      params: { api_key: API_KEY, file_size: FILE_SIZE, file_type: FILE_TYPE },
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
