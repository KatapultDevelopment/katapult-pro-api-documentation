# Katapult Pro V2 Documentation

## API Key Generation
The Katapult Pro API key is available for users to generate locally. To generate your own user authenticated API Key, you must have permissions setup to do so by your company Admin. Your company Admin should visit the Admin page in Katapult Pro, click on your user, click "Roles," and grant you API Access.

Once your admin has done so, the user granted API Access should navigate to their Home page in Katapult Pro by either entering the url https://katapultpro.com/home or selecting the App Tray menu and selecting Home. If you're Home page is empty, and you see a message that states "It's feeling lonely,” open the widget library by clicking the "Edit Widgets" button in the top right corner and select the Api Widget from the tray by clicking the blue "+" in the corner of the widget card.
 

![API Widget](https://github.com/KatapultDevelopment/katapult-pro-api-documentation/blob/main/v2/img/Widget.png)


If the API Key area appears blank, then it is the first time that a key is to be generated. If the Generate Key button is pushed, a key will be generated for you. After generating your key, you can either select “Copy Key” or highlight the key data and then paste into your application. For security reasons, there is a 10 second timeout on viewing your key. Once it expires, you will see a button saying “View API Key.” Click this button to view your key again for another 10 seconds. If your key has been compromised, you can regenerate a new one at any time.


***Generation Dialog:***  

![Widget Dialog](https://github.com/KatapultDevelopment/katapult-pro-api-documentation/blob/main/v2/img/WidgetDialog.png)


***Timeout Dialog:***  

![Timeout Dialog](https://github.com/KatapultDevelopment/katapult-pro-api-documentation/blob/main/v2/img/timeout.png)


## Rate limit
The Katapult Pro API V2 incorporates a throttling mechanism which limits the user’s back-to-back calls to the API. Currently, the default timeout has been set to two seconds. What this means is that after the first call to the API, the user must wait two seconds before executing the next call. Currently, the time base for this setting is in seconds with a low end to be equal to one. 


## Baseline Url
If running on a private server, include the sub-domain of your private server before katapultpro.com.


Ex: If your URL for accessing Katapult Pro on your private server were company.katapultpro.com, then instead of katapultpro.com/api/v2/jobs you'd use company.katapultpro.com/api/v2/jobs  


# GET Welcome Message
***Message:*** ***_katapultpro.com/api/v2?api_key={{api-key}}_***

***Welcome to the Katapult Pro API***

This simple API GET request is provided to allow the user to test basic API access. This request can be used to test your basic starter application to ensure the subscription is active and your "Welcome Message" API request is working before moving on to more complex requests.

***Query Params***
| Parameter | Value | Description |
| --------- | ----------- | ----------- |
| api_key   | `{{api-key}}` | Replace `{{api-key}}` in the example message above with your API key (no curly braces) |

***Example GET Welcome Message Request:***

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
(Where `{{api-key}}` is your API Key)  

***GET Welcome Message Response:***
```json
{
    "message": "Welcome to the Katapult Pro API V2"
}
```  

# GET User List
***Message:*** ***_katapultpro.com/api/v2/users?api_key={{api-key}}_***  
This GET request will return all of the users within your company.

***Query Params***
| Parameter | Value | Description |
| --------- | ----------- | ----------- |
| api_key   | `{{api-key}}` | Replace `{{api-key}}` with your API key |

***Example GET User List Request:***
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

***GET User List Response:***
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
***Message:*** ***_katapultpro.com/api/v2/jobs?orderByChild={{status || name}}&equalTo={{archived || active || job_name}}&api_key={{api-key}}_***  
This GET request will return a list of all jobs for your company.

The orderByChild and equalTo query parameters can be used to filter the job list to only jobs that have a certain status or name.

For example, by setting `orderByChild` to "status" and `equalTo` to "active," a list of all jobs that aren't archived are returned.
Another example is setting `orderByChild` to "name" and `equalTo` to "Test Job". In this case, the job with the name "Test Job" is returned.

***Query Params***
| Parameter | Value | Description |
| --------- | ----------- | ----------- |
| orderByChild | Set to "status" or "name" | Select one of these two sorting methods. Order/sort jobs by Job Status or Job Name |
| equalTo | Set to "archived," "active," or the name of the job in place of `job_name` | If "status" is used for `orderByChild`, use "archived" or "active;" if "name" is used for `orderByChild`, use the job name to return items that have matching values |
| `{{metadata_attribute_name}}` | `{{metadata_value_for_filtering}}` | Replace `{{metadata_attribute_name}}` with the name of the metadata attribute you want (in snake case) to filter the list with and the value of the attribute you are looking for; replace `{{metadata_value_for_filtering}}` with the value the filtered attributes should have |
| api_key | `{{api-key}}` | Replace `{{api-key}}` with your API key |

***Example GET Job List Request:***
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

***GET Job List Response:***
```java
{
    "-Lmz77ZC6bIjCMToOBXy": {
        "name": "Test Job",
        "status": "active"
    }
}

```  

# GET Updated Jobs List
***Message:*** ***_katapultpro.com/api/v2/updatedjobslist?fromDate={{fromDate}}&toDate={{toDate}}&useToday={{true || false}}&api_key={{api-key}}_***

This GET request uses a specified timeframe (the to and from dates) to return an object containing a list of Job IDs and their timestamps of when they were last updated. Jobs in this list are jobs that have been updated during the entered timeframe.  

**** **Important Note** ****
It is important that the length of the array that is returned from this request is monitored by your calling code routine. If the size of the array is 200, (which is the limit of the query,) then the user should expect that there are more than 200 total updated jobs in the query. If this is the case, you can simply use the last date in the array as the next `{{fromDate}}` to get the remaining Updated Jobs List. Please continue this method repeatedly until there is a zero length array received. We do not return the entire length of the queried time period initially entered.


***Query Params***
| Parameter | Value | Description |
| --------- | ----------- | ----------- |
| fromDate | `{{fromDate}}` | Replace `{{fromDate}}` with the starting date in the MM/DD/YY format (without leading zeros) i.e. 11/28/23 |
| toDate | `{{toDate}}` | Replace `{{toDate}}` with the ending date in the MM/DD/YY format (without leading zeros) i.e. 2/1/23 |
| useToday | Set to "true" or "false" | If marked true, the timestamp for the moment your request is received will be used for the end of the timeframe (for `toDate`) |
| api_key | `{{api-key}}` | Replace `{{api-key}}` with your API key |

***Example GET Updated Jobs List Request:***
```java
var axios = require('axios');
var data = '';

var config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'katapultpro.com/api/v2/updatedjobslist?fromDate=11/28/23&useToday=true&api_key={{api-key}}',
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

***GET Upadted Job List Response:***
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
***Message:*** ***_katapultpro.com/api/v2/updatednodeslist?fromDate={{fromDate}}&toDate={{toDate}}&useToday={{true || false}}&jobId={{jobId}}&attribute={{attribute_name}}&changed={{true || false}}&api_key={{api-key}}_***

This GET request uses a specified timeframe (to and from dates) and a Job ID to get a list of nodes whose specified attribute has been changed in that job during that timeframe. The GET returns an object with each node listed, including the Node ID and the timestamp for when the node's specified attribute changed.  

**** **Important Note** ****
It is important that the length of the array that is returned from this request is monitored by your calling code routine. If the size of the array is 200, (which is the limit of the query,) then the user should expect that there are more than 200 total updated nodes in the query. If this is the case, you can simply use the last date in the array as the next `{{fromDate}}` to get the remaining Updated Nodes List. Please continue this method repeatedly until there is a zero length array received. We do not return the entire length of the queried time period initially entered.


***Query Params***
| Parameter | Value | Description |
| --------- | ----------- | ----------- |
| fromDate | `{{fromDate}}` | Replace `{{fromDate}}` with the starting date in the MM/DD/YY format (without leading zeros) i.e. 11/28/23 |
| toDate | `{{toDate}}` | Replace `{{toDate}}` with the ending date in the MM/DD/YY format (without leading zeros) i.e. 2/1/23 |
| useToday | Set to "true" or "false" | If marked true, the timestamp for the moment your request is received will be used for the end of the timeframe (for `toDate`) |
| jobId | `{{jobId}}` | Replace `{{jobId}}` with the valid Job ID |
| attribute | `{{attribute_name}}` | Filter nodes by whether or not the specified attribute (replace `{{attribute_name}}` with the name of the attribute in snake case) has been changed in the given timeframe (optional) |
| changed | Set to "true" or "false" | List the nodes that were changed (using "true") or the nodes that were NOT changed (using "false") |
| api_key | `{{api-key}}` | Replace `{{api-key}}` with your API key |

***Example GET Updated Nodes List Request:***
```java
var axios = require('axios');
var data = '';

var config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'katapultpro.com/api/v2/updatednodeslist?fromDate=11/28/23&useToday=true&jobId={{jobId}}&attribute=field_completed&changed=true&api_key={{api-key}}',
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

***GET Updated Nodes List Response (with `changed=true`):***
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

***GET Updated Nodes List Response (if it were `changed=false`):***
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

This GET request will return the latest attribute tracking data for that job. (Make sure to replace the path variable `:jobId` with the job's valid Job ID.)

**** **Important Note** ****
It is important that the amount of items that is returned from this request is monitored by your calling code routine. If there are more than 200 items stored in the `attribute_changes` key, (which is the limit of the query,) then the user should expect that there are more than 200 total attribute changes in the query. If this is the case, you can simply use the last date in the list as the next `{{fromDate}}` to get the remaining Attribute Tracking List. Please continue this method repeatedly until there is a zero length list received. We do not return the entire length of the queried time period initially entered.


***Query Params***
| Parameter | Value | Description |
| --------- | ----------- | ----------- |
| fromDate | `{{fromDate}}` | Replace `{{fromDate}}` with the starting date in the MM/DD/YY format (without leading zeros) i.e. 11/28/23 |
| toDate | `{{toDate}}` | Replace `{{toDate}}` with the ending date in the MM/DD/YY format (without leading zeros) i.e. 2/1/23 |
| useToday | Set to "true" or "false" | If marked true, the timestamp for the moment your request is received will be used for the end of the timeframe (for `toDate`) |
| api_key | `{{api-key}}` | Replace `{{api-key}}` with your API key |  

***Path Variables***
| Variable | Replace With |
|--------- | ----------- |
| :jobId | The valid Job Id found in the URL of the opened job after the # |  

***Example GET Attribute Tracking List Request:***
```java
var axios = require('axios');
var data = '';

var config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://katapultpro.com/api/v2/attributeTracking/-NbLE2N_uhApTcVotF4X?fromDate=11/28/23&toDate=12/23/24&api_key={{api-key}}',
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

***GET Attribute Tracking List Response:***
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

This GET request will return the data for the job specified. (Make sure to replace `:jobId` with the job's valid Job ID.)
 Currently, the layer data has been omitted from the JSON data returned in the API response. The layer data can be too large for the response body.

Visit this link to see the structure for job data: https://katapultpro.com/schema/job.json. The data received in the API response body will contain all or some of the data as outlined in the link. This will be dependent on that data contained in each node, connection, etc. in the job (matching the provided Job ID) requested.

You can optionally include the _include_proposed_midspan_heights_ query parameter with a value of “true” to include calculated proposed heights for midspan wire objects in the output.

The `_api_proposed_height` key will be added to wire objects in midspans for either of these cases:

* The midspan wire is proposed
* The midspan wire is moved - either by a Make Ready move on the wire in the midspan itself or by a move on a pole at either end of the connection the midspan is on.

The value for `_api_proposed_height` is the calculated proposed height for the midspan wire in inches.  

***Query Params***  
| Parameter | Value | Description |
| --------- | ----------- | ----------- |
| include_proposed_midspan_heights | Set to "true" | Include proposed midspan heights in the response body |
| include_proposed_existing_and_markers | Set to "true" | Include this if proposed and existing heights are needed for all markers; you will see the proposed heights, existing heights, and marker IDs in the response body |
| height_marker_type | Set to "node," "midspan," or "both" | Optional parameter when using `include_proposed_existing_and_markers` to set which height photos should include the height data |
| include_pixel_selection | Set to "true" | Include this parameter and set it to "true" if pixel selection coordinates are needed for all markers |
| include_anchor_calibrations | Set to "true" | Include this parameter if anchor calibration markers should be included in the response body |
| include_mr_directives | Set to "true" | The response body will include Make Ready Directives for nodes and sections if this parameter is set to "true" |
| api_key   | `{{api-key}}` | Replace `{{api-key}}` with you API key |

***Path Variables***
| Variable | Replace With |
|--------- | ----------- |
| :jobId | The valid Job Id found in the URL of the opened job after the # |  

***Example GET Job Data Requst (Basic Request):***

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
***GET Job Data Response:***
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
***Same GET Job Data Response (but with `include_proposed_existing_and_markers=true` in request):***
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
***Same GET Job Data Response (but with `include_pixel_selection=true` and `include_anchor_calibrations=true` in request):***
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

This GET request returns the data at the specified paths for that job. You can include one path or up to 10 paths, separated by commas. Each path can have multiple path components, each separated with a forward slash.

For example, to fetch all nodes in a job, your path after the Job ID should be "nodes". To fetch data for a specific node, your path should be "nodes/`{{node_id}}`" where `{{node_id}}` is the valid ID of the node of interest. To fetch data for a specific node _and_ the job name, your path list should be "node/`{{node_id}}`,name".

If you only include one path, only the data at that path will be returned. If you include multiple paths, a JSON object will be returned. The keys of the returned object will be the paths you requested, regardless of whether there is data in the job at those paths or not. The values for those keys will be the data at those paths. If there is no data at a path requested, the value will be null.

Visit this link to see the structure for job data: https://katapultpro.com/schema/job.json

***Query Params***
| Parameter | Value | Description |
| --------- | ----------- | ----------- |
| api_key   | `{{api-key}}` | Replace `{{api-key}}` with your API key |  

***Path Variables***
| Variable | Replace With |
|--------- | ----------- |
| :jobId | The valid Job Id found in the URL of the opened job after the # |  
| :paths | A comma separated list of paths that should be fetched from the job |

***Example GET Partial Job Data Request (For Node Data in Job):***

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

***GET Partial Job Data (For Node Data in Job) Response:***

```java
{
  "nodes": {
    "-M2YUhu9X9vNaY5wFU3T": {
      "attributes": {
        "address": {
          "button_added": "20 Old York Rd, Dillsburg, PA 17019, USA"
        },
        "done": {
          "-M2YpKGiES_oIGV-vBPx": true
        },
        "field_completed": {
          "value": true
        },
        "google_elevation": {
          "button_added": "596 ft"
        },
        "measured_pole_height": {
          "one": "37.9"
        },
        "node_type": {
          "-M2YUoGiES_oIGV-vBPv": "pole"
        },
        "pole_class": {
          "one": "4"
        },
        "pole_height": {
          "one": "45"
        },
        "pole_spec": {
          "button_calced": "45-4 Douglas Fir"
        },
        "pole_species": {
          "one": "Southern Pine"
        },
        "pole_tag": {
          "multi_added": {
            "company": "Power Co",
            "owner": false,
            "tagtext": "20184 28261"
          }
        },
        "scid": {
          "auto_button": "004"
        },
        "time_bucket": {
          "-4IYb_xfJQs3RibCe2j": {
            "start": 1584366709987,
            "stop": 1584366772084,
            "uid": "f7a257cf-4a0a-51v3-8834-e54b85b77d7c"
          }
        },
        "vantage_point": {
          "auto_button": {
            "latitude": 40.10694889153705,
            "longitude": -77.0279890671048
          }
        }
      },
      "latitude": 40.10706582519959,
      "longitude": -77.02798504379128,
      "photos": {
        "03e35fde-c41d-4597-bc7b-b1f10273104f": {
          "association": true
        },
        "2696c773-05d2-4c7d-bd52-dad2281b808e": {
          "association": true
        },
        "4fcc29a8-50s0-43bd-95q0-5df791ecb071": {
          "association": true
        },
        "df0e7121-4d1a-0e65-9731-b82248c063be": {
          "association": "main"
        }
      }
    },
    "-M2GUhu5F9mYaY5wFUoP": {
                   ........ Rest of Data Omitted Due to Length *********
    }
  }                 
}
```  

# GET Photo URL
***Message:*** ***_katapultpro.com/api/v2/jobs/:jobId/photoURL/:photoId?api_key={{api-key}}&file_size={{full || none}}_***

This GET request will request the download URL link of the photo with a matching Photo ID contained on the server. This requires that a previous request to the job has been made to obtain the photo ID to be used. Anything other than a valid photo ID for that job will be rejected.


Visit this link to see the structure for job data: https://katapultpro.com/schema/job.json


***Query Params***
| Parameter | Value | Description |
| --------- | ----------- | ----------- |
| file_size | Set to "full" or "none" | Return the full sized photo link or none |  
| api_key   | `{{api-key}}` | Replace `{{api-key}}` with your API key |


***Path Variables***
| Variable | Replace With |
|--------- | ----------- |
| :jobId | The valid Job Id found in the URL of the opened job after the # |  
| :photoId | A valid photo push ID within the selected job |  

***Example GET Photo URL Request:***

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
***GET Photo URL Response:***

```json
{
    "url": "https://firebasestorage.googleapis.com/v0/b/katapult-production.appspot.com/o/photos%2F015eb1bdd-e8c9-4824-a721-9047aeafdee5_full.webp?alt=media&token=6c8f5b2a-c578-4f4b-ba68-ff6674e96f40"
}
```


# POST Create Node
***Message:*** ***_katapultpro.com/api/v2/jobs/:jobId/nodes?api_key={{api-key}}_***

This POST request creates a new node within a job. The job must be existing, and its Job ID needs to be passed along as a path variable. The payload body needs a latitude/longitude at a minimum, but it can take an array of objects, denoting attributes to include on the newly created node. Please note that the request can add a single node or multiple nodes. The body is setup for an array of objects. If a total of more than 100 nodes are passed in the body, the request will be rejected. If this occurs, you can repeat the request multiple times to complete a larger node count. An example body is shown after the query params and path variables.
  
Visit this link to see the structure for job data (inside which is the structure for node data): https://katapultpro.com/schema/job.json

***Query Params***
| Parameter | Value | Description |
| --------- | ----------- | ----------- |
| api_key   | `{{api-key}}` | Replace `{{api-key}}` with your API key |

***Path Variables***
| Variable | Replace With |
|--------- | ----------- |
| :jobId | The valid Job Id found in the URL of the opened job after the # |   


***Example Payload Body***
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

***Example POST Create Node Request:***
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
***POST Create Node Response:***  

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

This POST request creates a new job. The payload body needs a job name, the map styles, and model name. Please note that the request can add a single job or multiple jobs. The body is setup for an array of objects. If a total of more than 100 jobs are passed in the body, the request will be rejected. If this occurs, you can repeat the request multiple times to complete a larger jobs count. An example body is shown after the query params.


***Query Params***
| Parameter | Value | Description |
| --------- | ----------- | ----------- |
| api_key   | `{{api-key}}` | Replace `{{api-key}}` with your API key |


***Example Payload Body:***
```json
{
        "name" : "API Test",
        "mapStyles" : "default",
        "model" : "Katapult"
}
```

***Example POST Create Job Request:***
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
***POST Create Job Response:***  

Note: The return payload from this request will provide the Job Id for the newly created job. You can use this information to PATCH in any new attributes or add attributes and settings to the job. 

```json
{
    "jobId": "-N_9o3H3_PmKWs88JDfz"
}
```

# PATCH Update Node on Job
***Message:*** ***_katapultpro.com/api/v2/jobs/:jobId/nodes/:nodeid?api_key={{api-key}}_***

This PATCH request updates an existing node within a job. The request requires a vaild Job ID and Node ID. The payload body can have a latitude/longitude and an array of objects, denoting which attributes to update.


***Query Params***
| Parameter | Value | Description |
| --------- | ----------- | ----------- |
| api_key   | `{{api-key}}` | Replace `{{api-key}}` with your API key |  

***Path Variables***
| Variable | Replace With |
| ----------- | ----------- |
| :jobId | The valid Job Id found in the URL of the opened job after the # |  
| :nodeId | The valid Node Id of the node to update, found in the URL of the opened job with the node selected, after the -n |  

***Example Payload Body:***
```json
{
    "latitude": 29.56486371782001,
    "longitude": -98.6970369527974,
    "attributes": [
        {"attribute": "company", "value": "Unknown"}
    ]
}
```

***Example PATCH Update Node on Job Request:***
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
***PATCH Update Node on Job Response:***
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

This PUT request uploads a photo to a specific node. The request requires a vaild Job ID and Node ID. The payload body should be the image that will be added to the node.


***Query Params***
| Parameter | Value | Description |
| --------- | ----------- | ----------- |
| api_key   | `{{api-key}}` | Replace `{{api-key}}` with your API key |

***Path Variables***  
| Variable | Replace With |
| ----------- | ----------- |
| :jobId | The valid Job Id found in the URL of the opened job after the # |  
| :nodeId | The valid Node Id of the node to update, found in the URL of the opened job with the node selected, after the -n |  

***Example Payload Body:***
```json

var data = 'image.jpg'

```

***Example PUT Upload Photo To Node Request:***
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
***PUT Upload Photo To Node Response:***
Note: The return payload from this request will provide a confirmation of the changes. 

```json
    "OK"
```
# PUT Upload Photo To Section
***Message:*** ***_katapultpro.com/api/v2/jobs/:jobId/connections/:connectionId/sections/:sectionId/photos?api_key={{api-key}}_***

This PUT request uploads a photo on a specific section. The request requires a vaild Job ID, Connection ID, and Section ID. The payload body be the image that will be added to the node.


***Query Params***
| Parameter | Value | Description |
| --------- | ----------- | ----------- |
| api_key   | `{{api-key}}` | Replace `{{api-key}}` with your API key |  

***Path Variables***
| Variable | Replace With |
| ----------- | ----------- |
| :jobId | The valid Job Id found in the URL of the opened job after the # |  
| :nodeId | The valid Node Id of the node to update, found in the URL of the opened job after the -n | 
| :connectionId | The valid Connection Id of the connection to update, found in the URL of the opened job with the selected connection, after the -c |
| :sectionId | The valid Section Id of the section to update | 


***Example Payload Body***
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

# PUT Archive a Job
***Message:*** ***_katapultpro.com/api/v2/jobs/:jobId/archive?api_key={{api-key}}_***

This PUT request will change the specified job's status from 'active' to 'archived.' The job ID is required to complete this request.


***Query Params***
| Parameter | Value | Description |
| --------- | ----------- | ----------- |
| api_key   | `{{api-key}}` | Replace `{{api-key}}` with your API key |
  
***Path Variables***
| Variable | Replace With |
| ----------- | ----------- |
| :jobId | The valid Job Id found in the URL of the opened job after the # |  


***Example PUT Upload Photo To Section***
```java
var axios = require('axios');

var config = {
  method: 'put',
  maxBodyLength: Infinity,
  url: 'katapultpro.com/api/v2/jobs/:jobId/archive?api_key={{api-key}}',
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
***PUT Upload Photo To Section Response***
Note: This request doesn't return any response body.

# PUT Un-Archive a Job
***Message:*** ***_katapultpro.com/api/v2/jobs/:jobId/unarchive?api_key={{api-key}}_***

This PUT request will change the job's status from 'archived' to 'active.' The job ID is required to complete this request.


***Query Params***
| Parameter | Value | Description |
| --------- | ----------- | ----------- |
| api_key   | `{{api-key}}` | Replace `{{api-key}}` with your API key |

***Path Variables***
| Variable | Replace With |
| ----------- | ----------- |
| :jobId | The valid Job Id found in the URL of the opened job after the # |  


***Example PUT Upload Photo To Section***
```java
var axios = require('axios');

var config = {
  method: 'put',
  maxBodyLength: Infinity,
  url: 'katapultpro.com/api/v2/jobs/:jobId/unarchive?api_key={{api-key}}',
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
***Response PUT Upload Photo To Section***
Note: This request doesn't return any response body.
