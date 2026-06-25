//*********************************************************************************************
//* Name: node-getUser.js
//* Description: Katapult Pro API v3 — Get a single user's core fields plus their attributes (metadata).
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
      url: `${URL_PATH}/users/${USER_ID}?api_key=${API_KEY}`,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
