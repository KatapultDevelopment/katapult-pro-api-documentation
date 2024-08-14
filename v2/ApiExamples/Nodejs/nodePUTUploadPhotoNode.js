//*********************************************************************************************/
//* Name: nodePUTUploadPhotoNode.js
//* Author: Josh
//* Created: 8/1/2024
//* Description: Simple API V2 call to PUT Update photo on Node.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
//*             errors or omissions in the content of this Katapult API Example. The 
//*             information contained in this software example is provided on an "as is" 
//*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..
//*             This Example uses Axios:Install CLI->npm install axios
//*********************************************************************************************/
const axios = require('axios');

const URL_PATH = 'https://training.katapultpro.com/api/v2/jobs'; 
const API_KEY = 'sJ3zygFJN_ZU81-3I8w0VLZvFUst_5L-2uuVzXubYbFeAP7vr52VRc1BMlIOQ0bHks1EfMSe8rBYhNHfoec9kBjj9wsYJPXseA8gb1cOhBC6Ne8MVceNs4kz5wiNDuHtECn0tM41pYlMYJ8eSKe75F_Ct4GfWO15sVg2sRGvw5kMfmfnbUEmYd6Cx_a6lAPXcaxW4ZdkRgRajYqKA-58oXYOIKpP9Buna74ZgzYPdAXVTmtE3oKkpUzLUQaLdKtgLzn7JaTkRo_RnFpe54Pwt7GVn8mxtCAAA3nDCqX-FmTi9PcIqwU-Lxoxqm6aUy4Mu4rvSj9adVYRR8qUVwEtog'
const JOB_ID = '/-O0AVVbpV-M0Mp8JbVE7';
const NODE_ID = '/-O0AVbHZTCKRGVaXqbP8'
function createJob()
{
    // Change data to what is wanted
    var data = 'Cat03.jpg';

    var config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${URL_PATH}${JOB_ID}/nodes${NODE_ID}/photos?api_key=${API_KEY}`,
        headers: { 
          'Content-Type': 'image/jpeg'
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