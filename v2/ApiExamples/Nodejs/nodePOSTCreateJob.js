//*********************************************************************************************/
//* Name: nodeCreateNode.js
//* Author: Josh
//* Created: 8/1/2024
//* Description: Simple API V2 call to POST Create Job.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
//*             errors or omissions in the content of this Katapult API Example. The 
//*             information contained in this software example is provided on an "as is" 
//*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..
//*             This Example uses Axios:Install CLI->npm install axios
//*********************************************************************************************/
const axios = require('axios');

const URL_PATH = 'https://katapultpro.com/api/v2/jobs'; 
const API_KEY = '<<API_KEY>>'

function createJob()
{
    // Change data to what is wanted
    var data = JSON.stringify({
        "name" : "Job Name",
        "mapStyles" : "Map Style",
        "model" : "Model name"
    });
    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${URL_PATH}?api_key=${API_KEY}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

createJob();