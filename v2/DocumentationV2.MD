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
***Message:*** ***_katapultpro.com/api/v2?api_key={{api-key}}_***

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

# GET User List
***Message:*** ***_katapultpro.com/api/v2/users?api_key={{api-key}}_***
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


# GET Job List
***Message:*** ***_katapultpro.com/api/v2/jobs?orderByChild=status/name&equalTo=archived/active/job name&api_key={{api-key}}_***
A GET request to /jobs will return a list of all jobs for your company.

The orderByChild and equalTo query parameters can be used to filter the job list to only jobs that have a certain status or name.

For example, by setting `orderByChild` to "status" and `equalTo` to "active," a list of all jobs with a status of "active" are returned.
Another example is setting `orderByChild` to "name" and `equalTo` to "Test Job". In this case, the job with the name "Test Job" is returned.

***Query Params***
| Parameter | Description |
| --------- | ----------- |
| orderByChild | status/name - Two sorting methods can be selected. Order or sort by Job Name or Job Status |
| equalTo | Return items equal to the specified key or value, depending on the order-by method chosen (either status or name) |
| filter | Metadata attribute you want to use to filter the list |
| value| Filter metadata value to use | 
| api_key | {{api-key}} Your API key with the braces removed |

***Example Get Job List***
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
        "name": "Test Job",
        "status": "active"
    }
}

```

# GET Updated Jobs List
***Message:*** ***_katapultpro.com/api/v2/updatedjobslist?fromDate=fromDate&toDate=toDate&useToday=true/false&api_key={{api-key}}_***

A GET request using the start/end or to/from Date to get a list of Job ids and date stamp for jobs that have been updated during the entered timeframe. This get will return an object containing a list of job ID's and their timestamp. 

**** **Important Note** ****
It is important that the length of the array that is returned from this request is monitored by your calling code routine. If the size of the array is 200(Which is the limit of the query) then the user should expect that there are more than 200 total updated jobs in the query. If this is the case you can simply use the last date in the array as the next {{fromDate}} to get the remaining Updated Jobs List. Please continue this method repeatedly until there is a zero length array received. We do not return the entire length of the queried time period initially entered.


***Query Params***
| Parameter | Description |
| --------- | ----------- |
| fromDate | 1/1/23 etc - Start or From Date |
| toDate | 2/1/23 - End or To Date |
| useToday | true/false - Use todays date if marked true |
| api_key | {{api-key}} Your API key with the braces removed |

***Example GET Updated Jobs List***
```java
var axios = require('axios');
var data = '';

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'katapultpro.com/api/v2/updatedjobslist?fromDate=0&toDate=11/28/23&useToday=true&api_key={{api-key}}',
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
[  
    {  
        "jobId": "-N_4KXQ5CpSO9Tnmy6vX",  
        "last_updated": "2023-07-28T14:35:02.259Z"  
    },  
    {  
        "jobId": "-NaNYiarOSF8_laR297a",  
        "last_updated": "2023-07-27T18:47:08.482Z"  
    },  
    {  
        "jobId": "-NaNGnTKmclbtlmmq84u",  
        "last_updated": "2023-07-27T18:25:13.038Z"  
    }  
]

```

# GET Updated Nodes List
***Message:*** ***_katapultpro.com/api/v2/updatednodeslist?fromDate=fromDate&toDate=toDate&useToday=true/false&jobId={{jobId}}&attribute=attribute&changed=true/false&api_key={{api-key}}_***

A GET request using the start/end or to/from Date and a Job id to get a list of nodes that have been changed in that job. Each node listed includes the Node id and the date stamp for when the attribute changed. This get will return an object containing the data. 

**** **Important Note** ****
It is important that the length of the array that is returned from this request is monitored by your calling code routine. If the size of the array is 200(Which is the limit of the query) then the user should expect that there are more than 200 total updated nodes in the query. If this is the case you can simply use the last date in the array as the next {{fromDate}} to get the remaining Updated Nodes List. Please continue this method repeatedly until there is a zero length array received. We do not return the entire length of the queried time period initially entered.


***Query Params***
| Parameter | Description |
| --------- | ----------- |
| fromDate | 1/1/23 etc - Start or From Date |
| toDate | 2/1/23 - End or To Date |
| useToday | true/false - Use todays date if marked true |
| jobId | {{jobId}} Valid Job ID with braces removed |
| attribute | "field_completed" - Filter nodes by whether or not a specific attribute has been changed in the given timeframe (optional) |
| changed | true/false - List the nodes that were changed or the nodes that were NOT changed |
| api_key | {{api-key}} Your API key with the braces removed |

***Example GET Updated Nodes List***
```java
var axios = require('axios');
var data = '';

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'katapultpro.com/api/v2/updatednodeslist?fromDate=0&toDate=11/28/23&useToday=true&jobId={{jobId}}&attribute=field_completed&changed=true&api_key={{api-key}}',
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

***Response with changed***
```java
[  
    {  
        "nodeId": "-N_4KXQ5CpSO9Tnmy6vX",  
        "set_as": "2023-07-28T14:35:02.259Z"  
    },  
    {  
        "nodeId": "-NaNYiarOSF8_laR297a",  
        "set_as": "2023-07-27T18:47:08.482Z"  
    },  
    {  
        "nodeId": "-NaNGnTKmclbtlmmq84u",  
        "set_as": "2023-07-27T18:25:13.038Z"  
    }  
]

```

***Response with unchanged***
```java
[  
    {  
        "nodeId": "-N_4KXQ5CpSO9Tnmy6vX"
    },  
    {  
        "nodeId": "-NaNYiarOSF8_laR297a"
    },  
    {  
        "nodeId": "-NaNGnTKmclbtlmmq84u"
    }  
]

```
# GET Attribute Tracking List
***Message:*** ***_katapultpro.com/api/v2/attributeTracking/:jobId?api_key={{api-key}}_***

A GET request to a job will return the latest attribute tracking data for that job. 

**** **Important Note** ****
It is important that the length of the array that is returned from this request is monitored by your calling code routine. If the size of the array is 200(Which is the limit of the query) then the user should expect that there are more than 200 total updated jobs in the query. If this is the case you can simply use the last date in the array as the next {{fromDate}} to get the remaining Updated Jobs List. Please continue this method repeatedly until there is a zero length array received. We do not return the entire length of the queried time period initially entered.


***Query Params***
| Parameter | Description |
| --------- | ----------- |
| fromDate | 1/1/23 etc - Start or From Date |
| toDate | 2/1/23 - End or To Date |
| useToday | true/false - Use todays date if marked true |
| api_key | {{api-key}} Your API key with the braces removed |

***Example GET Updated Jobs List***
```java
var axios = require('axios');
var data = '';

var config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://katapultpro.com/api/v2/attributeTracking/-NbLE2N_uhApTcVotF4X?fromDate=0&toDate=11/28/23&useToday=true&api_key={{api-key}}',
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
   "jobId": "-NbLE2N_uhApTcVotF4X",
    "jobName": "Testing attribute tracking",
    "attribute_changes": {
        "c7f6843dbcacaea36d847f901e6bea8f": {
            "timestamp": 1692199883822,
            "entity_type": "NODE",
            "entity_id": "-NbyyGEGYG3wPe6AABRu",
            "attribute": "internal_note",
            "value_key": "button_added",
            "value": "",
            "user": "TaSs4PIIboZ9labZxm6RmeCREmm1"
        },
        "befed3a7581374486d847f901e6bea8f": {
            "timestamp": 1692199883822,
            "entity_type": "NODE",
            "entity_id": "-NbyyGEGYG3wPe6AABRu",
            "attribute": "done",
            "value_key": "button_added",
            "value": false,
            "user": "TaSs4PIIboZ9labZxm6RmeCREmm1"
        },
        "40ab4528fd1d44d56d847f901e6bea8f": {
            "timestamp": 1692199883822,
            "entity_type": "NODE",
            "entity_id": "-NbyyGEGYG3wPe6AABRu",
            "attribute": "node_type",
            "value_key": "button_added",
            "value": "pole",
            "user": "TaSs4PIIboZ9labZxm6RmeCREmm1"
        }
    }
}

```
# GET Job Data
 ***Message:*** ***_katapultpro.com/api/v2/jobs/:jobId?api_key={{api-key}}_***

A GET request to a job will return the data for that job. Currently, the layer data has been omitted from the JSON data returned in the API response. The layer data can be too large for the response body.

Visit this link to see the structure for job data: https://katapultpro.com/schema/job.json The data received in the API response body will contain all or some of the data as outlined in the link. This will be dependent on that data contained in each node, connection, etc. in the job ID requested.

You can optionally include the _include_proposed_midspan_heights_ query parameter with a value of “true” to include calculated proposed heights for midspan wire objects in the output.

The  _api_proposed_height_  key will be added to midspan wire objects in either of these cases:

* The midspan wire is proposed
* The midspan wire is moved - either by a make ready move on the wire itself or by a move on a pole at either end of the connection.

The value for  _api_proposed_height_  is the calculated proposed height for the midspan wire in inches.


***Query Params***
| Parameter | Description |
| --------- | ----------- |
| api_key   | {{api-key}} Your API key with the braces removed |
| include_proposed_midspan_heights | true Include this if proposed midspan heights are required. |
| include_proposed_existing_and_markers | true Include this if proposed and existing heights are needed for all markers. |
| height_marker_type | node/midspan/both Optional addition for include_proposed_existing_and_markers. Set which height photos should include the height data. |
| include_pixel_selection | true Include this if pixel selection coordinates are needed for all markers. |
| include_anchor_calibrations | true Include this if anchor calibration markers are required. |
| include_mr_directives | true Includes Make Ready Directives for nodes and sections|

***Path Variables***
| Variable | Description |
| --------- | ----------- |
| jobId | Your valid Job ID |

***Example Get Job Data: Basic Request***

```java
const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'katapultpro.com/api/v2/jobs/-N9lrzHqQm7pvCJoj5w6?api_key={{api-key}}',
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

        ........ Rest of Data Omitted Due to Length *********

    }
}
```
***Response with include_proposed_existing_and_markers***
```json
{

    ........ Beginning Data Omitted Due to Length *********

    "nodes": {
            "-M2YUhu9X9vNaY5wFU3T": {

                ........ Additional Data Omitted Due to Length *********

                "_proposed_existing_and_label_data": [
                    {
                        "existing_height": 457.31,
                        "proposed_height": 457.31,
                        "marker_label": "Pole Top"
                    },
                    {
                        "existing_height": 448.91,
                        "proposed_height": 448.91,
                        "marker_label": "MET-ED Primary"
                    },
                    {
                        "existing_height": 412.02,
                        "proposed_height": 412.02,
                        "marker_label": "MET-ED Cutout Arrestor"
                    },
                    {
                        "existing_height": 387.58,
                        "proposed_height": 387.58,
                        "marker_label": "MET-ED Termination Bracket"
                    },

                    ........ Rest of Data Omitted Due to Length *********
                ]
            }
    }
}
```
***Response with include_pixel_selection and include_anchor_calibrations***
```json
{

    ........ Beginning Data Omitted Due to Length *********

    "nodes": {
            "-M2YUhu9X9vNaY5wFU3T": {
                "_proposed_existing_and_label_data": [

                ........ Additional Data Omitted Due to Length *********

                    {
                        "existing_height": 252.53,
                        "proposed_height": 252.53,
                        "marker_label": "Comcast - Williamsport CATV Com",
                        "pixel_selection": [
                            {
                                "percentX": 47.65352323643377,
                                "percentY": 39.65934446031943
                            }
                        ]
                  },
                  {
                      "existing_height": 212.41,
                      "proposed_height": 212.41,
                      "marker_label": "CTSI, LLC, Dba Frontier Communications Telco Com",
                      "pixel_selection": [
                          {
                              "percentX": 50.391601764197546,
                              "percentY": 47.767067465788564
                          }
                      ]
                  },
                  {
                      "existing_height": 16.5,
                      "proposed_height": 16.5,
                      "marker_label": "Anchor Calibration",
                      "pixel_selection": [
                          {
                              "percentX": 49.85583863910207,
                              "percentY": 50.74869937852991
                          }
                      ]
                  },

                    ........ Rest of Data Omitted Due to Length *********
                ]
            }
    }
}

```    
# GET Partial Job Data
***Message:*** ***_katapultpro.com/api/v2/jobs/:jobId/:paths?api_key={{api-key}}_***

A GET request to a job with a list of paths included after the job ID will return the data at the specified paths for that job. You can include one path, or up to 10 paths separated by commas. Each path can have multiple path components, each separated with a forward slash.

For example, to fetch all nodes in a job your path after the job ID should be "nodes". To fetch data for a specific node, your path should be "nodes/{node_id}". To fetch data for a specific node and the job name, your path list should be "node/{node_id},name".

If you only include one path, only the data at that path will be returned. If you include multiple paths, a JSON object will be returned. The keys of the returned object will be the paths you requested, regardless if there is data in the job at those paths or not. The values for those keys will be the data at those paths. If there is no data at a path requested, the value will be null.

Visit this link to see the structure for job data: https://katapultpro.com/schema/job.json

***Query Params***
| Parameter | Description |
| --------- | ----------- |
| api_key   | {{api-key}} Your API key with the braces removed |
| jobId | Your valid Job ID |
| paths | A comma separated list of paths that should be fetched from the job |

***Example Get Partial Job Data: Nodes***

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
# GET Photo URL
***Message:*** ***_katapultpro.com/api/v2/jobs/:jobId/photoURL/:photoid?api_key={{api-key}}&filesize=_***

A GET request to a job with a previously obtained photoID(Photo's push ID) to request the download URL link of that photo contained on the server. This requires that a previous request to the job has been made to obtain the photo ID to be used. Anything other than a valid photo ID for that job will be rejected.


Visit this link to see the structure for job data: https://katapultpro.com/schema/job.json

***Query Params***
| Parameter | Description |
| --------- | ----------- |
| api_key   | {{api-key}} Your API key with the braces removed |
| jobId | Your valid Job ID |
| photoid | A valid photo push ID with in the selected job |
| filesize | full sized photo link or none |

***Example Get Photo URL from Job ***

```java
var axios = require('axios');

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'katapultpro.com/api/v2/jobs/-NgVTYY_sWEyFzpLHXWT/photoURL/015eb1ba-e8c9-4824-a721-9047?api_key={{api-key}}&filesize=full',
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
***Response Get Photo URL***

```json
{
    "url": "https://firebasestorage.googleapis.com/v0/b/katapult-production.appspot.com/o/photos%2F015eb1bdd-e8c9-4824-a721-9047aeafdee5_full.webp?alt=media&token=6c8f5b2a-c578-4f4b-ba68-ff6674e96f40"
}
```


# POST Create Node
***Message:*** ***_katapultpro.com/api/v2/jobs/:jobId/nodes?api_key={{api-key}}_***

A POST request to /nodes which allows you to create a new node within a job. The job must be existing and it's Job ID needs to be passed along as a path variable. The payload body needs a latitude/longitude at a minimum, but can take an array of objects, denoting attributes to include on the newly created node. Please note that the request can add a single node or multiple nodes. The body is setup for an array of objects. If a total of more than 100 nodes are passed in the body the request will be rejected. If this occurs you can repeat the request multiple times to complete a larger node count. An example body is as follows.


***Query Params***
| Parameter | Description |
| --------- | ----------- |
| api_key   | {{api-key}} Your API key with the braces removed |
| jobId | Your valid Job ID |
|  | |


***Example Body***
```json
{
    "nodes":[
        {
            "latitude": 40.1054820,
            "longitude": -77.0231781,
            "attributes": [
                {"attribute": "node_type", "value": "pole"}
            ]
        },
        {
            "latitude": 40.1054289,
            "longitude": -77.0229224,
            "attributes": [
                {"attribute": "node_type", "value": "pole"}
            ]
        }
    ]
}
```

***Example POST Create Node on Job***
```java
var axios = require('axios');
var data = JSON.stringify({
    "nodes":[
        {
            "latitude": 40.1054820,
            "longitude": -77.0231781,
            "attributes": [
                {"attribute": "node_type", "value": "pole"}
            ]
        },
        {
            "latitude": 40.1054289,
            "longitude": -77.0229224,
            "attributes": [
                {"attribute": "node_type", "value": "pole"}
            ]
        }
    ]
});

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'katapultpro.com/api/v2/jobs/-NEHqS0tfoLCECdgOAh-/nodes?api_key={{api-key}}',
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
```
***Response POST Create Node on Job***
Note: The return payload from this request will provide a list of push ID's for your newly created nodes. You can use this information to PATCH in any new attributes or add attributes and settings to the node. 

```json
{
    "jobId": "-N_9o3H3_PmKWs88JDfz",
    "NodesCreated": [
        {
            "key": "-NnKcywg4nOcroLJwIf-",
            "data": {
                "latitude": 40.105482,
                "longitude": -77.0231781,
                "_created": {
                    "uid": "unknown",
                    "timestamp": 1704391339820,
                    "method": "api"
                },
                "attributes": {
                    "node_type": {
                        "-NnKcywg4nOcroLJwIf0": "pole"
                    }
                }
            }
        },
        {
            "key": "-NnKcywngKFqiLEU5-Hs",
            "data": {
                "latitude": 40.1054289,
                "longitude": -77.0229224,
                "_created": {
                    "uid": "unknown",
                    "timestamp": 1704391339827,
                    "method": "api"
                },
                "attributes": {
                    "node_type": {
                        "-NnKcywngKFqiLEU5-Ht": "pole"
                    }
                }
            }
        }
    ]
}
```
# POST Create Job
***Message:*** ***_katapultpro.com/api/v2/jobs?api_key={{api-key}}_***

A POST request to /jobs which allows you to create a new job. The payload body needs a job name, the map styles and model name. Please note that the request can add a single job or multiple jobs. The body is setup for an array of objects. If a total of more than 100 jobs are passed in the body the request will be rejected. If this occurs you can repeat the request multiple times to complete a larger jobs count. An example body is as follows.


***Query Params***
| Parameter | Description |
| --------- | ----------- |
| api_key   | {{api-key}} Your API key with the braces removed |
|  | |


***Example Body***
```json
{
        "name" : "API Test",
        "mapStyles" : "default",
        "model" : "Katapult"
}
```

***Example POST Create  Job***
```java
const axios = require('axios');


var data = JSON.stringify({
    "name" : "API Test",
    "mapStyles" : "default",
    "model" : "Katapult"
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


```
***Response POST Create Job***
Note: The return payload from this request will provide the Job Id for the newly created jojb. You can use this information to PATCH in any new attributes or add attributes and settings to the job. 

```json
{
    "jobId": "-N_9o3H3_PmKWs88JDfz"
}
```

# PATCH Update Node on Job
***Message:*** ***_katapultpro.com/api/v2/jobs/:jobId/nodes/:nodeid?api_key={{api-key}}_***

A PATCH request to /nodes/:nodeId allows you to update an existing node within a job. The request requires a vaild Job ID and Node ID. The payload body can have a latitude/longitude and an array of objects, denoting which attributes to update.


***Query Params***
| Parameter | Description |
| --------- | ----------- |
| api_key   | {{api-key}} Your API key with the braces removed |
| jobId | Your valid Job ID |
| nodeId | ID of Node to Update|

***Example Body***
```json
{
    "latitude": 29.56486371782001,
    "longitude": -98.6970369527974,
    "attributes": [
        {"attribute": "company", "value": "Unknown"}
    ]
}
```

***Example PATCH Update Node on Job***
```java
var axios = require('axios');
var data = JSON.stringify({
  "latitude": "latitude of the node",
  "longitude": "longitude of the node",
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
  url: 'katapultpro.com/api/v2/jobs/-NEHqS0tfoLCECdgOAh-/nodes/-NEa1Q0IXKB2N5x_UZvL?api_key={{api-key}}',
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
```
***Response PATCH Update Node on Job***
Note: The return payload from this request will provide a confirmation of the changes. 

```json
{
    "key": "-NnFmrvT80tBTpshdg4G",
    "data": {
        "_created": {
            "method": "api",
            "timestamp": 1704310046430,
            "uid": "unknown"
        },
        "attributes": {
            "node_type": {
                "-NnFqXoaZc8J5mOKQlkG": "pole"
            },
            "company": {
                "-NnFr9Kpe5QFQi7oBGmk": "Unknown"
            }
        },
        "latitude": 40.105482,
        "longitude": -77.0231781
    }
}
```
# PUT Upload Photo To Node
***Message:*** ***_katapultpro.com/api/v2/jobs/:jobId/nodes/:nodeid/photos?api_key={{api-key}}_***

A PUT request to /nodes/:nodeId/photos allows you to put a photo on a specific node. The request requires a vaild Job ID and Node ID. The payload body be the image that will be added to the node.


***Query Params***
| Parameter | Description |
| --------- | ----------- |
| api_key   | {{api-key}} Your API key with the braces removed |
| jobId | Your valid Job ID |
| nodeId | ID of Node to Update|

***Example Body***
```json

var data = 'image.jpg'

```

***Example PUT Upload Photo To Node***
```java
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
```
***Response PUT Upload Photo To Node***
Note: The return payload from this request will provide a confirmation of the changes. 

```json
    "OK"
```
# PUT Upload Photo To Section
***Message:*** ***_katapultpro.com/api/v2/jobs/:jobId/connections/:connectionId/sections/:sectionId/photos?api_key={{api-key}}_***

A PUT request to /sections/:sectionId/photos allows you to put a photo on a specific section. The request requires a vaild Job ID, Connection ID, and Section ID. The payload body be the image that will be added to the node.


***Query Params***
| Parameter | Description |
| --------- | ----------- |
| api_key   | {{api-key}} Your API key with the braces removed |
| jobId | Your valid Job ID |
| connectionId | ID of Connection to Update|
| sectionID | ID of Section to Update|


***Example Body***
```json

var data = 'image.jpg'

```

***Example PUT Upload Photo To Section***
```java
var config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${URL_PATH}${JOB_ID}/connections${CONNECTION_ID}/sections${SECTION_ID}/photos?api_key=${API_KEY}`,
        headers: { 
          'Content-Type': 'image/jpeg'
        },
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
```
***Response PUT Upload Photo To Section***
Note: The return payload from this request will provide a confirmation of the changes. 

```json
    "OK"
```
