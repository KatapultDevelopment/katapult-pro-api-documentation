# Katapult Pro V2 Documentation

## API Key Generation
The Katapult Pro API key is available for users to generate locally. To generate your own user authenticated API Key, you must have permissions setup to do so by your company Admin. Your company Admin should be able to go to the /Admin page available to them in Katapult Pro and choose to grant you access. Once they have done so, the user should navigate to their /Home directory in Katapult Pro by either entering the url https://katapultpro.com/home or selecting the App Tray menu and selecting Home. If you are arriving at the home screen for the first time, it is unlikely you have anything showing on the page or perhaps there’s a message that states "It's feeling lonely.” If this is the case, go to the configuration menu and select the widget from the tray.
 

![API Widget](https://github.com/KatapultDevelopment/katapult-pro-api-documentation/blob/main/v2/img/Widget.png)

If the API Key area appears blank, then it is the first time that a key is to be generated. If the Generate Key button is pushed, a key will be generated for you. After generating your key, you can either select “Copy Key” or highlight the key data and the paste into your application. For security reasons, there is a 10 second timeout on viewing your key. Once it expires, you will see a button called “View API Key.” Clicking this button will allow you to view your key again for another 10 second timeout. If your key has been compromised, you can regenerate a new one at any time.


***Generation Dialog***
![Widget Dialog](https://github.com/KatapultDevelopment/katapult-pro-api-documentation/blob/main/v2/img/WidgetDialog.png)

***Timeout Dialog***
![Timeout Dialog](https://github.com/KatapultDevelopment/katapult-pro-api-documentation/blob/main/v2/img/timeout.png)


## Rate limit
The Katapult Pro API V2 incorporates a throttling mechanism which limits the user’s back-to-back calls to the API. Currently, the default timeout has been set to two seconds. What this means is that after the first call to the API, the user must wait two seconds before executing the next call. Currently, the time base for this setting is in seconds with a low end to be equal to one. 


## Baseline Url
If running on a private server, include the sub-domain of your private server before katapultpro.com.

Ex: katapultpro.com/api/v2/jobs -> katapultpro.com/api/v2/jobs

# GET Welcome Message
***Message:*** ***_katapultpro.com/api/v2_***

***Welcome to the Katapult Pro API***

A simple API GET request is provided to allow the user to test basic API access. This request can be used to test your basic starter application to ensure the subscription is active and your "Welcome Message" API request is working before moving on to more complex requests.

***Query Params***
| Parameter | Description |
| --------- | ----------- |
| api_key   | {{api-key}} Your API key with the braces removed |

***Example Welcome Message Request***

```javascript
var axios = require('axios');
var data = '';

var config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'katapultpro.com/api/v2?api_key={{api-key}}',
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

# <font color="green">GET</font> User List
katapultpro.com/api/v2/users?api_key={{api-key}}
A GET request to /users will return all of the users within your company.

***Query Params***
| Parameter | Description |
| --------- | ----------- |
| api_key   | {{api-key}} Your API key with the braces removed |

***Example User List Request***
```java
var axios = require('axios');

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'katapultpro.com/api/v2/users?api_key={{api-key}}',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```
***Request***
```json
{
    "rqtVnITNGsOZg1NPq1yv1tnICoX2": {
        "address": {
            "city": "",
            "state": "",
            "street_line_1": "",
            "street_line_2": "",
            "zip": ""
        },
        "api_access": true,
        "creation_date": 1672929589000,
        "email": "jsmith@company.com",
        "last_active": 1694791391367,
        "name": {
            "first": "John",
            "last": "Smith"
        },
        "phone_number": "",
        "read_permission": true,
        "roles": {
            "photoheight": {
                "company": "Company",
                "company_admin": true,
                "permissions": {
                    "model_editor_read_access": true,
                    "model_editor_write_access": true
                }
            }
        },
        "write_permission": true
    }
}
```


# <font color="green">GET</font> Job List
***Message:*** ***_katapultpro.com/api/v2/jobs?orderByChild=status/name&equalTo=archived/active/job name&api_key={{api-key}}_***
A GET request to /jobs will return a list of all jobs for your company.

The orderByChild and equalTo query parameters can be used to filter the job list to only jobs that have a certain status or name.

For example, by setting `orderByChild` to "status" and `equalTo` to "active," a list of all active jobs is returned.

***Query Params***
| Parameter | Description |
| --------- | ----------- |
| orderByChild | status/name- Two sorting methods can be selected. Order or sort by Job Name or Job Status  |
| equalTo | archived/active/job name - Provide a sorting criteria of archived, active, or Job name based on orderByChild setting.  |
| api_key   | {{api-key}} Your API key with the braces removed |

***Example Get Job List ***
```java
var axios = require('axios');
var data = '';

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'katapultpro.com/api/v2/jobs?orderByChild=name&equalTo=Test Job&api_key={{api-key}}',
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
```java
{
    "-Lmz77ZC6bIjCMToOBXy": {
        "name": "ALS test",
        "status": "active"
    },
    "-MDH3uOAmjd1oJq8cTJy": {
        "name": "JDC Test Export",
        "status": "active"
    },
    "-N5H0mh0ZEG6zVt5EnyH": {
        "name": "AED Functions Test",
        "status": "active"
    },
    "-N5g7Ny29QKTVSkv2oph": {
        "name": "TOS Test",
        "status": "active"
    },

```

# <font color="green">GET</font> Job Data
 ***Message:*** ***_katapultpro.com/api/v2/jobs/:jobId?api_key={{api-key}}_***

A GET request to a job will return the data for that job. Currently, the layer data has been omitted from the JSON data returned in the API response. The layer data can be too large for the response body.

Visit this link to see the structure for job data: https://katapultpro.com/schema/job.json The data received in the API response body will contain all or some of the data as outlined in the link. This will be dependent on that data contained in each node, connection, etc.. in the job ID requested.

You can optionally include the _include_proposed_midspan_heights_ query parameter with a value of “true” to include calculated proposed heights for midspan wire objects in the output.

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

# <font color="green">GET</font> Partial Job Data
katapultpro.com/api/jobs/:jobId/:paths?api_key={{api-key}}

A GET request to a job with a list of paths included after the job ID will return the data at the specified paths for that job. You can include one path, or up to 10 paths separated by commas. Each path can have multiple path components, each separated with a forward slash.

For example, to fetch all nodes in a job, your path after the job ID should be nodes. To fetch data for a specific node, your path should be nodes/{node_id}. To fetch data for a specific node and the job name, your path list should be node/{node_id},name.

If you only include one path, only the data at that path will be returned. If you include multiple paths, a JSON object will be returned. The keys of the returned object will be the paths you requested, regardless if there is data in the job at those paths or not. The values for those keys will be the data at those paths. If there is no data at a path requested, the value will be null.

Visit this link to see the structure for job data: https://katapultpro.com/schema/job.json

***Query Params***
| Parameter | Description |
| --------- | ----------- |
| api_key   | {{api-key}} Your API key with the braces removed |
| jobId | Your valid JobID |
| paths | A comma separated list of paths that should be fetched from the job |

***Example Get Partial Job Data: Bodes***

```java
var axios = require('axios');

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'katapultpro.com/api/v2/jobs/-N9lrzHqQm7pvCJoj5w6/nodes?api_key={{api-key}}',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```
