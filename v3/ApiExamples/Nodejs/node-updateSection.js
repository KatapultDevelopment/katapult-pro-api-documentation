//*********************************************************************************************
//* Name: node-updateSection.js
//* Description: Katapult Pro API v3 — Update a section on a connection.
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
const SECTION_ID = '<<YOUR_SECTION_ID>>';

// Optional query param: if 'true', the section is only updated if it already
// exists (it will not be created). Set to null to omit.
const ONLY_IF_EXISTS = 'true';

// Optional body fields. add_attributes adds/overwrites; remove_attributes drops
// attributes by name.
const body = {
  latitude: 42.8864,
  longitude: -78.8784,
  add_attributes: { section_label: 'midspan' },
  remove_attributes: ['old_label'],
};

async function run() {
  try {
    let url = `${URL_PATH}/jobs/${JOB_ID}/connections/${CONNECTION_ID}/sections/${SECTION_ID}?api_key=${API_KEY}`;
    if (ONLY_IF_EXISTS != null) {
      url += `&onlyIfExists=${ONLY_IF_EXISTS}`;
    }
    const response = await axios({
      method: 'post',
      url,
      data: body,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
