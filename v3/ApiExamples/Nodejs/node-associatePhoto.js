//*********************************************************************************************
//* Name: node-associatePhoto.js
//* Description: Katapult Pro API v3 — Associate a photo to a node or section (or unassociate).
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
const axios = require('axios');
const URL_PATH = 'https://katapultpro.com/api/v3';
const API_KEY = '<<YOUR_API_KEY>>';

// Path placeholders — fill in with your own ids.
const JOB_ID = '<<YOUR_JOB_ID>>';
const PHOTO_ID = '<<YOUR_PHOTO_ID>>';
const NODE_ID = '<<YOUR_NODE_ID>>';

// association_value is required: 'main', true, or null (to unassociate).
// Provide node_id to associate to a node, OR connection_id + section_id for a section.
const body = {
  node_id: NODE_ID,
  association_value: 'main',
};

// To associate to a section instead of a node, use a body like:
// const body = {
//   connection_id: '<<YOUR_CONNECTION_ID>>',
//   section_id: '<<YOUR_SECTION_ID>>',
//   association_value: true,
// };
//
// To UNASSOCIATE the photo from the item, set association_value to null
// (keep the same node_id, or connection_id + section_id):
// const body = { node_id: NODE_ID, association_value: null };
//
// Codependency rules (node XOR section, accepted values) are documented in
// ../../concepts/complex-parameters.md#associating-a-photo-node-vs-section-vs-unassociate

async function run() {
  try {
    const response = await axios({
      method: 'post',
      url: `${URL_PATH}/jobs/${JOB_ID}/photos/${PHOTO_ID}/associate?api_key=${API_KEY}`,
      data: body,
    });
    console.log('Status:', response.status);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error', error.response?.status, JSON.stringify(error.response?.data));
  }
}

run();
