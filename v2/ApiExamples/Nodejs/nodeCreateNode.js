//*********************************************************************************************/
//* Name: nodeCreateNode.js
//* Author: Josh
//* Created: 6/27/2024
//* Description: Simple API V2 call to POST Create Node.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
//*             errors or omissions in the content of this Katapult API Example. The 
//*             information contained in this software example is provided on an "as is" 
//*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..
//*             This Example uses Axios:Install CLI->npm install axios
//*********************************************************************************************/
const axios = require('axios');

const URL_PATH = 'https://training.katapultpro.com/api/v2/jobs'; 
const API_KEY = '<<API_KEY>>'
const JOB_ID = '<<JOB ID>>'


function createNode()
{
    var data = JSON.stringify({
        // Change node information to what is needed
        "nodes":[
            {
                "latitude": 40.1085310,
                "longitude": -77.0336775,
                "attributes": [
                    {"attribute": "node_type", "value": "pole"}
                ]
            },
            {
                "latitude": 40.1086244,
                "longitude": -77.0332766,
                "attributes": [
                    {"attribute": "node_type", "value": "pole"}
                ]
            }
        ]
    });
    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${URL_PATH}${JOB_ID}/nodes?api_key=${API_KEY}`,
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


// Run  
createNode()