//*********************************************************************************************/
//* Name: nodeGETPartialJobLData.js
//* Author: T2
//* Created: 1/18/2024
//* Description: Simple API V2 call to GET Partial Job Data.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
//*             errors or omissions in the content of this Katapult API Example. The 
//*             information contained in this software example is provided on an "as is" 
//*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..
//*             This Example uses Axios:Install CLI->npm install axios
//*********************************************************************************************/
const axios = require('axios');

// Define Path and API Key
const URL_PATH = 'https://katapultpro.com/api/v2/jobs';
const JOB_ID = '/-Nml3-QC7iem777EbKNt'
const API_KEY = '<<API_KEY>>';
const ITEMS_LIST = '/nodes'; //<< Get just Node data from job

function delay(i) {
   return new Promise(resolve => {
       setTimeout(function() { 
           resolve();
       }, 1000 * i); 
   }); 
}; 

function runGetPartialJobDataReq() {      
   // Send it
   axios({
      method: 'get',
      url: `${URL_PATH}${JOB_ID}${ITEMS_LIST}?api_key=${API_KEY}`
   }).then(function (response) {      
      // Check response
      if(response?.status === 200) {
         console.log(`\x1b[32m${JSON.stringify(response.data, null, '\t')} \x1b[0m`);
      }
      
   }).catch(function (error) {
      // handle error
      if(error) {
         console.log(`\x1b[31m${error.response.status} ${JSON.stringify(error.response.data)}\x1b[0m`);
      }
   });   
}

// Run 
runGetPartialJobDataReq();