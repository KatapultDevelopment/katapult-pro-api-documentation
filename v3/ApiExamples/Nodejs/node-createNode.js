//*********************************************************************************************
//* Name: node-createNode.js
//* Description: Katapult Pro API v3 — Create a node in a job.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');

const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Path placeholder — fill in with your own id.
const JOB_ID = '<<YOUR_JOB_ID>>';

// Required: latitude, longitude. Optional: attributes, add_attributes.
//   - attributes use the full {name: {instance_id: value}} shape.
//   - add_attributes is a flat {name: value} map (the API picks instance ids).
const body = {
  latitude: 42.8864,
  longitude: -78.8784,
  add_attributes: { node_type: 'pole' },
};

async function run() {
  try {
    const response = await axios({
      method: 'post',
      url: `${URL_PATH}/jobs/${JOB_ID}/nodes?api_key=${API_KEY}`,
      data: body,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
