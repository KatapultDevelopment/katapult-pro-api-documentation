//*********************************************************************************************/
//* Name: nodeGETUpdateNodesList.js
//* Author: Josh
//* Created: 6/27/2024
//* Description: Simple API V2 call to GET Updated Nodes List
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
//*             errors or omissions in the content of this Katapult API Example. The 
//*             information contained in this software example is provided on an "as is" 
//*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..
//*             This Example uses Axios:Install CLI->npm install axios
//*********************************************************************************************/
const axios = require('axios');

const URL_PATH = 'https://katapultpro.com/api/v2/updatednodeslist'; 
const FROM_DATE = 'fromDate=2023-11-28';
const TO_DATE = 'toDate=2024-6-25';
const USE_TODAY = 'useToday=false';
const JOB_ID = '-O0KFX4jhtW847Kbo73U'
const ATTRIBUTE = 'attributes=done'
const CHANGED = 'changed=true'
const API_KEY = '<<API_key>>';


function runUpdateNodeList()
{
    var data = '';

    var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${URL_PATH}?${FROM_DATE}&t${TO_DATE}&${USE_TODAY}&jobId=${JOB_ID}&${ATTRIBUTE}&${CHANGED}&api_key=${API_KEY}`,
    headers: { },
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

// Run
runUpdateNodeList();