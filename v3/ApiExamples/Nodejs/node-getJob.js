//*********************************************************************************************
//* Name: node-getJob.js
//* Description: Katapult Pro API v3 — Get partial job data for a job.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');

const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Path placeholder — fill in the id of the job to read.
const JOB_ID = '<<YOUR_JOB_ID>>';

// Optional comma-separated list of data paths to return. Allowed paths:
// name, job_creator, job_owner, project_folder, project_id, status, done,
// map_styles, metadata, sharing. Omitting paths returns only the job id (no data).
const PATHS = 'name,status,metadata';

async function run() {
  try {
    const response = await axios({
      method: 'get',
      url: `${URL_PATH}/jobs/${JOB_ID}`,
      params: {
        api_key: API_KEY,
        paths: PATHS,
      },
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
