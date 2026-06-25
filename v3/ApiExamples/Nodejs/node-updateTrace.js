//*********************************************************************************************
//* Name: node-updateTrace.js
//* Description: Katapult Pro API v3 — Update a trace (creates it if it does not exist,
//*              unless onlyIfExists=true).
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');
const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Fill in the ids of the job and the trace you want to update.
const JOB_ID = '<<YOUR_JOB_ID>>';
const TRACE_ID = '<<YOUR_TRACE_ID>>';

// Optional query param: 'true' updates only if the trace already exists (no creation).
const ONLY_IF_EXISTS = 'true';

// Both body fields are optional: trace_type and attributes (a flat map of attribute
// names to single values).
const body = {
  trace_type: 'cable',
  attributes: { cable_type: 'secondary', owner: 'electric' },
};

async function run() {
  try {
    const response = await axios({
      method: 'post',
      url: `${URL_PATH}/jobs/${JOB_ID}/traces/${TRACE_ID}?api_key=${API_KEY}&onlyIfExists=${ONLY_IF_EXISTS}`,
      data: body,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
