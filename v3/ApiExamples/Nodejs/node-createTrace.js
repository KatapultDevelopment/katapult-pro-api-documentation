//*********************************************************************************************
//* Name: node-createTrace.js
//* Description: Katapult Pro API v3 — Create a trace in a job.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');
const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Fill in the id of the job where the trace will be created.
const JOB_ID = '<<YOUR_JOB_ID>>';

// Body: trace_type is required; attributes is an optional flat map of attribute
// names to single values.
const body = {
  trace_type: 'cable',
  attributes: { cable_type: 'primary', owner: 'electric' },
};

async function run() {
  try {
    const response = await axios({
      method: 'post',
      url: `${URL_PATH}/jobs/${JOB_ID}/traces?api_key=${API_KEY}`,
      data: body,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
