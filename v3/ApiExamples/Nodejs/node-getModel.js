//*********************************************************************************************
//* Name: node-getModel.js
//* Description: Katapult Pro API v3 — Get model data for a single model.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');

const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Path placeholder — replace with the model key you want to fetch. Must not contain '/'.
const MODEL_KEY = 'your-model-key';

// Comma-separated list of sub-paths to return (maximum 10), 1000 tokens per path.
// Use `paths` — this is the supported way to read model data. A full model fetch
// (empty string here / omit `paths`) requires extended API access and returns a
// 403 `extended_access_required` in production, where extended access is off.
const PATHS = 'attributes,node_types';

async function run() {
  try {
    const params = { api_key: API_KEY };
    if (PATHS) {
      params.paths = PATHS;
    }
    const response = await axios({
      method: 'get',
      url: `${URL_PATH}/models/${MODEL_KEY}`,
      params,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
