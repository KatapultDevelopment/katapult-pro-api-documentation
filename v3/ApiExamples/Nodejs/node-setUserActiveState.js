//*********************************************************************************************
//* Name: node-setUserActiveState.js
//* Description: Katapult Pro API v3 — Set a user's active state (move their view to a path/page).
//* RESTRICTED:  This endpoint requires extended API access, which is DISABLED IN PRODUCTION, and
//*              the 'enable_api_user_state_calls' feature flag enabled for your company.
//*              Calling it without extended access returns an 'extended_access_required' error.
//*              Note: the target user's client only *visually* moves if they've opted in to
//*              API state changes (they're prompted to accept/deny the first time this
//*              endpoint updates their state; see Account Settings > Allow API State Changes).
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');

const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Path placeholder — fill in with your own id. Must be the caller's own user id, or the
// caller must be a company admin, otherwise this returns a 403 'forbidden' error.
const USER_ID = '<<YOUR_USER_ID>>';

// 'path' is the path to record as the user's last activity (must start with jobs/...).
// 'page' must be either 'map' or 'photos'. Both fields are required.
const body = {
  path: 'jobs/-Nabc...',
  page: 'map',
};

async function run() {
  try {
    const response = await axios({
      method: 'post',
      url: `${URL_PATH}/users/${USER_ID}/active_state`,
      params: { api_key: API_KEY },
      data: body,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
    // response.data.data is the new active state: { last_updated, source: 'api', path, page }
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
