//*********************************************************************************************
//* Name: node-createConnection.js
//* Description: Katapult Pro API v3 — Create a connection (span) between two nodes in a job.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');
const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Fill in the id of the job and the two node ids the connection spans between.
const JOB_ID = '<<YOUR_JOB_ID>>';
const NODE_ID_1 = '<<YOUR_NODE_ID_1>>';
const NODE_ID_2 = '<<YOUR_NODE_ID_2>>';

// node_id_1 and node_id_2 are required. attributes / add_attributes are optional.
const body = {
  node_id_1: NODE_ID_1,
  node_id_2: NODE_ID_2,
  add_attributes: { connection_type: 'aerial cable' },
};

async function run() {
  try {
    const response = await axios({
      method: 'post',
      url: `${URL_PATH}/jobs/${JOB_ID}/connections?api_key=${API_KEY}`,
      data: body,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
