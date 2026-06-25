//*********************************************************************************************
//* Name: node-createSection.js
//* Description: Katapult Pro API v3 — Create a section (midspan point) on a connection.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');

const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Path placeholders — fill these in with your own ids.
const JOB_ID = '<<YOUR_JOB_ID>>';
const CONNECTION_ID = '<<YOUR_CONNECTION_ID>>';

// Optional body fields. Set make_midpoint to true to place the section at the
// connection's midpoint (overwrites an existing midpoint section). Otherwise
// provide latitude/longitude to position it (Buffalo, NY shown here).
const body = {
  make_midpoint: false,
  latitude: 42.8864,
  longitude: -78.8784,
  add_attributes: { section_label: 'midspan' },
};

async function run() {
  try {
    const response = await axios({
      method: 'post',
      url: `${URL_PATH}/jobs/${JOB_ID}/connections/${CONNECTION_ID}/sections?api_key=${API_KEY}`,
      data: body,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
