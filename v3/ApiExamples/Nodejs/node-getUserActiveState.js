//*********************************************************************************************
//* Name: node-getUserActiveState.js
//* Description: Katapult Pro API v3 — Get a user's active state (their last known path/page).
//* RESTRICTED:  This endpoint requires extended API access, which is DISABLED IN PRODUCTION, and
//*              the 'enable_api_user_state_calls' feature flag enabled for your company.
//*              Calling it without extended access returns an 'extended_access_required' error.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');

const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Path placeholder — fill in with your own id.
const USER_ID = '<<YOUR_USER_ID>>';

async function run() {
  try {
    const response = await axios({
      method: 'get',
      url: `${URL_PATH}/users/${USER_ID}/active_state?api_key=${API_KEY}`,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
    // response.data.data is `null` if no active state has been recorded yet,
    // otherwise: { last_updated, source: 'client' | 'api', path, page: 'map' | 'photos' }
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
