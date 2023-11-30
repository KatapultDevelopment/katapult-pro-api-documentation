//*********************************************************************************************/
//* Name: apiV2Test.js
//* Author: T2
//* Created: 11/16/2023
//* Description: Statemachine driven test program to validate API V2 calls and actions.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
//*             errors or omissions in the content of this Katapult API Example. The 
//*             information contained in this software example is provided on an "as is" 
//*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..
//*             This Example uses Axios:Install CLI->npm install axios
//*********************************************************************************************/
const axios = require('axios');

// Define Path and API Key
const URL_PATH = 'https://katapultpro.com/api/v2';
const API_KEY = 'TswJJ5RKpJjbK9xrg42Z9ASd3uVon6n-c0UQzAMbWF9RmJYXZCuL2oCQ1Z2gHaOS31rJvbdUf5tCzp_zzKSGwpk379fGiRupniyMkpkVjw0Kn2x8LiTi-YuDTPT9anDHrWG5J7HpUK1jIe6JG51fjVnfcVVkZelBuRILtwZeUfX_mRWtOjqLCTpwLFvLIqTGYCXST3ZKu4rokMMGjgOhYxD4_xBcNRkBOWQ9W7VrTWLGXXqyRqY4hGVZPVERMrlsMpV598KrhvVR_8aBB2_FFzYLmU5cYoFvG6xJW406vpgoZBz0cSWGMpFG72bI8HQd9-MINU-CSIHmzFmVJWFImA';

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


