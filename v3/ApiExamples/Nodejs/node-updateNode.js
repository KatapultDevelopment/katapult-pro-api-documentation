//*********************************************************************************************
//* Name: node-updateNode.js
//* Description: Katapult Pro API v3 — Update (or create) a node in a job.
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

// Optional query: if 'true', only update an existing node (never create one).
const ONLY_IF_EXISTS = 'true';

// All body fields are optional for an update.
//   - attributes use the full {name: {instance_id: value}} shape.
//   - add_attributes is a flat {name: value} map.
//   - remove_attributes is an array of attribute names to remove.
const body = {
  latitude: 42.8864,
  longitude: -78.8784,
  add_attributes: { node_type: 'pole' },
  remove_attributes: ['note'],
};

async function run() {
  try {
    const response = await axios({
      method: 'post',
      url: `${URL_PATH}/jobs/${JOB_ID}/nodes/${NODE_ID}?api_key=${API_KEY}&onlyIfExists=${ONLY_IF_EXISTS}`,
      data: body,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
