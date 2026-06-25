//*********************************************************************************************
//* Name: node-updateConnection.js
//* Description: Katapult Pro API v3 — Update a connection (creates it if it does not exist,
//*              unless onlyIfExists=true).
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');
const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Fill in the ids of the job and connection, plus the node ids the connection spans.
const JOB_ID = '<<YOUR_JOB_ID>>';
const CONNECTION_ID = '<<YOUR_CONNECTION_ID>>';
const NODE_ID_1 = '<<YOUR_NODE_ID_1>>';
const NODE_ID_2 = '<<YOUR_NODE_ID_2>>';

// Optional query param: 'true' updates only if the connection already exists (no creation).
const ONLY_IF_EXISTS = 'true';

// All body fields are optional: node_id_1, node_id_2, attributes, add_attributes,
// remove_attributes.
const body = {
  node_id_1: NODE_ID_1,
  node_id_2: NODE_ID_2,
  add_attributes: { connection_type: 'aerial cable' },
  remove_attributes: ['note'],
};

async function run() {
  try {
    const response = await axios({
      method: 'post',
      url: `${URL_PATH}/jobs/${JOB_ID}/connections/${CONNECTION_ID}?api_key=${API_KEY}&onlyIfExists=${ONLY_IF_EXISTS}`,
      data: body,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
