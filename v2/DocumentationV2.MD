# Katapult Pro V2 Documentation

## API Key Generation
The Katapult Pro API key is available for users to generate locally. To generate your own user authenticated API Key you must have permissions setup to do so by your company Admin. Your company Admin should be able to go to the /Admin page available to them in Katapult Pro and choose to grant you access. Once they have done so the user should navigate to their /Home directory in Katapult Pro by either entering the url https://katapultpro.com/home or selecting waffle menu dropdown and selecting home. If you are arriving at the home screen for the first time it is unlikely you have anything showing on the page or perhaps a message that states "It's feeling lonely" message. If this is the case go to the configuration menu and select the widget from the tray. 
![API Widget](https://github.com/KatapultDevelopment/katapult-pro-api-documentation/blob/main/v2/img/Widget.png)


## Rate limit
You may make 100 concurrent requests at any one time per API key. If you hit the concurrent requests limit two times within 5 minutes, your calls to the API will be strictly limited for 5 minutes.

If running on a private server, include the sub-domain of your private server before katapultpro.com.

Ex: katapultpro.com/api/jobs -> .katapultpro.com/api/jobs

# GET Welcome Message
***Message:*** ***_katapultpro.com/api_***

***Welcome to the Katapult Pro API***

A simple API GET request is provided to allow the user to test basic API access. This request can be used to test your basic starter application with or without API Key to ensure the subscription is active and your "Welcome Message" API request is working before moving on to more complex requests.

***Example Welcome Message Request***

```javascript
var axios = require('axios');
var data = '';

var config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'katapultpro.com/api',
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
***Response***
```json
{
    "message": "Welcome to the Katapult Pro API V2"
}
```

# <font color="green">GET</font> Get Job Data
 ***Message:*** ***_katapultpro.com/api/jobs/:jobId?api_key={{api-key}}_***

A GET request to a job will return the data for that job. Currently, the layer data has been omitted from the JSON data returned in the API response. The layer data can be to large for the response body. 

Visit this link to see the structure for job data: https://katapultpro.com/schema/job.json The data received in the API response body will contain all or some of the data as outlined in the link. This will be dependent on that data contained in each node, connection, etc.. in the job ID requested.

You can optionally include the _include_proposed_midspan_heights_ query parameter with a value of true to include calculated proposed heights for midspan wire objects in the output. 

The  _api_proposed_height_  key will be added to midspan wire objects in either of these cases:

* The midspan wire is proposed
* The midspan wire is moved - either by a make ready move on the wire itself or by a move on a pole at either end of the connection.

The value for  _api_proposed_height_  is the calculated proposed height for the midspan wire in inches.

***Query Params***
| Parameter | Description |
| --------- | ----------- |
| api_key   | {{api-key}} Your API key with the braces removed |
| include_proposed_midspan_heights | true Include this define based on if proposed midspan hieghts are required. |

***Path Variables***
| Variable | Description |
| --------- | ----------- |
| jobId | Your valid JobID |

***Example Get Job Data: Basic Request***

```java
const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'katapultpro.com/api/jobs/-N9lrzHqQm7pvCJoj5w6?api_key={{api-key}}',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```
***Response***
```json
{
    "connections": {
        "-NSGzkSLuepnLrHBMDsy": {
            "_created": {
                "method": "desktop",
                "timestamp": 1680707880790,
                "uid": "cPKA4ptkD1PplRH1Rs2MrjVHE8f1"
            },
            "attributes": {
                "connection_type": {
                    "button_added": "aerial cable"
                }
            },
            "button": "aerial",
            "node_id_1": "-NSGzkSK3-7ce4VJo9fX",
            "node_id_2": "-NSGzjoK3bNio0SZWe2C"
        },
        "-NSGzkunNqlwTQndVnVF": {
            "_created": {
                "method": "desktop",
                "timestamp": 1680707882675,
                "uid": "cPKA4ptkD1PplRH1Rs2MrjVHE8f1"
            },
            "attributes": {
                "connection_type": {
                    "button_added": "aerial cable"
                }
            },
            "button": "aerial",
            "node_id_1": "-NSGzkumOX1FHynLR9RG",
            "node_id_2": "-NSGzkSK3-7ce4VJo9fX"
        },

        ........ Rest of Data Omitted due to length *********

}
```