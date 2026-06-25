//*********************************************************************************************
//* Name: node-deleteNode.js
//* Description: Katapult Pro API v3 — Delete a node from a job.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');

const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Path placeholders — fill in with your own ids.
const JOB_ID = '<<YOUR_JOB_ID>>';
const NODE_ID = '<<YOUR_NODE_ID>>';

async function run() {
  try {
    const response = await axios({
      method: 'delete',
      url: `${URL_PATH}/jobs/${JOB_ID}/nodes/${NODE_ID}?api_key=${API_KEY}`,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
