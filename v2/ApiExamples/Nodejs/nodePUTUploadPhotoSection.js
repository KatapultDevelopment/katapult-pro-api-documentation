//*********************************************************************************************/
//* Name: nodePUTUploadPhotoNode.js
//* Author: Josh
//* Created: 8/1/2024
//* Description: Simple API V2 call to PUT Update photo on Section.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
//*             errors or omissions in the content of this Katapult API Example. The 
//*             information contained in this software example is provided on an "as is" 
//*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..
//*             This Example uses Axios:Install CLI->npm install axios
//*********************************************************************************************/
const axios = require('axios');

const URL_PATH = 'https://training.katapultpro.com/api/v2/jobs'; 
const API_KEY = '<<API_key>>'
const JOB_ID = '/-O0AVVbpV-M0Mp8JbVE7';
const CONNECTION_ID = '/-O4H3Zm036Kg8B3urjeV'
const SECTION_ID = '/-O4H42xVu0bR_oBjSAWK'

function createJob()
{
    // Change data to what is wanted
    var data = 'Cat03.jpg';

    var config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${URL_PATH}${JOB_ID}/connections${CONNECTION_ID}/sections${SECTION_ID}/photos?api_key=${API_KEY}`,
        headers: { 
          'Content-Type': 'image/jpeg'
        },
        data : data
      };
      console.log(config.url);
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

createJob();