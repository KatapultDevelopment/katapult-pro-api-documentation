//*********************************************************************************************/
//* Name: nodePATCHUpdateNode.js
//* Author: Josh Hoffman
//* Created: 6/27/2024
//* Description: Simple API V2 call to PATCH Update Node on Job.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
//*             errors or omissions in the content of this Katapult API Example. The 
//*             information contained in this software example is provided on an "as is" 
//*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..
//*             This Example uses Axios:Install CLI->npm install axios
//*********************************************************************************************/
const axios = require('axios');

const URL_PATH = 'https://katapultpro.com/api/v2/jobs';
const API_KEY = '<<API KEY>>';
const JOB_ID = '<<JOB ID>>';
const NODE_ID = '<<NODE ID>>';

function runUpdateNode()
{
    // Change data to desired info
    var data = JSON.stringify({
        "latitude": 40.1081535,
        "longitude": -77.0335541,
        "attributes": [
            {
            "attribute": "node_type",
            "value": "pole"
            }
        ]
    });
    var config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `${URL_PATH}${JOB_ID}/nodes${NODE_ID}?api_key=${API_KEY}`,
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
runUpdateNode();