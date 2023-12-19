//*********************************************************************************************/
//* Name: nodeGETWelcome.js
//* Author: T2
//* Created: 11/16/2023
//* Description: Simple API V2 call to GET Welcome message.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
//*             errors or omissions in the content of this Katapult API Example. The 
//*             information contained in this software example is provided on an "as is" 
//*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..
//*             This Example uses Axios:Install CLI->npm install axios
//*********************************************************************************************/
const axios = require('axios');

// Define Path and API Key
const URL_PATH = 'https://katapultpro.com/api/v2';
const API_KEY = '<<YOUR_API_KEY>>';

function delay(i) {
   return new Promise(resolve => {
       setTimeout(function() { 
           resolve();
       }, 1000 * i); 
   }); 
}; 

function runWelcomeReq() {      
   // Send it
   axios({
      method: 'get',
      url: `${URL_PATH}?api_key=${API_KEY}`
   }).then(function (response) {      
      // Check response
      if(response?.status === 200) {
         console.log(`\x1b[32m${JSON.stringify(response.data)} \x1b[0m`);
      }
      
   }).catch(function (error) {
      // handle error
      if(error) {
         console.log(`\x1b[31m${error.response.status} ${JSON.stringify(error.response.data)}\x1b[0m`);
      }
   });   
}

// Run 
runWelcomeReq();


