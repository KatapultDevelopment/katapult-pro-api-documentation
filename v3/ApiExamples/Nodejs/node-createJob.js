//*********************************************************************************************
//* Name: node-createJob.js
//* Description: Katapult Pro API v3 — Create a job.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');

const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Body: name and model are required; map_styles, metadata, and sharing are optional.
const body = {
  name: 'API Example Job',
  model: 'your-model-name',
  metadata: { city: 'Buffalo', status: 'in_progress' },
  sharing: {},
};

async function run() {
  try {
    const response = await axios({
      method: 'post',
      url: `${URL_PATH}/jobs`,
      params: { api_key: API_KEY },
      data: body,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
