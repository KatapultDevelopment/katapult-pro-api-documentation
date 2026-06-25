//*********************************************************************************************
//* Name: node-writeRawJobData.js
//* Description: Katapult Pro API v3 — Raw job write (path:value map).
//* RESTRICTED:  This endpoint requires extended API access, which is DISABLED IN PRODUCTION.
//*              Calling it without extended access returns an 'extended_access_required' error.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');

const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Path placeholder — fill in the id of the job to write to.
const JOB_ID = '<<YOUR_JOB_ID>>';

// Body is a map of job-relative paths to values (use null to delete a path).
// Allowed top-level keys: nodes, connections, photos, photo_summary, files,
// traces, compatible_units, warning_reports. Reserved keys (metadata, name,
// model, map_styles, sharing) must use the non-raw update endpoint.
const body = {
  'nodes/-Nabc.../attributes/note/-Ninst...': 'set via raw write',
};

async function run() {
  try {
    const response = await axios({
      method: 'post',
      url: `${URL_PATH}/jobs/${JOB_ID}/raw`,
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
