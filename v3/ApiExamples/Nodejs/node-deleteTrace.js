//*********************************************************************************************
//* Name: node-deleteTrace.js
//* Description: Katapult Pro API v3 — Delete a trace.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');
const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Fill in the ids of the job and the trace you want to delete.
const JOB_ID = '<<YOUR_JOB_ID>>';
const TRACE_ID = '<<YOUR_TRACE_ID>>';

async function run() {
  try {
    const response = await axios({
      method: 'delete',
      url: `${URL_PATH}/jobs/${JOB_ID}/traces/${TRACE_ID}?api_key=${API_KEY}`,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
