# Katapult Pro API Documentation

Welcome to the Katapult Pro API!

## Versions
- (Preview) [Katapult Pro API v3](v3/README.md)
- [Katapult Pro API v2](v2/DocumentationV2.MD)
- [Katapult Pro API v1](https://documenter.getpostman.com/view/9081167/SVtVV93W)

## Introduction

[API](https://en.wikipedia.org/wiki/API) stands for Application Programming Interface: a software intermediary that allows a user to programmatically access application resources without using a front end interface. They are useful for automating tasks, integrating with other applications, and building custom solutions. Katapult Pro has an API that allows users to programmatically access and manipulate their Katapult Pro data, including jobs, users, company information, and more.

The Katapult Pro API is a [RESTful](https://en.wikipedia.org/wiki/REST) API that uses standard HTTP methods (GET, POST, DELETE) to interact with resources.

## Getting Started

### Authentication

To get started with the Katapult Pro API, you will need to obtain an API key. This key is used to authenticate your requests and ensure that only authorized users can access your data. Obtaining an API is done in different ways depending on the version of the API you are using.
- For v2 (and v3 preview), see the [v2 API Key generation guide](v2/DocumentationV2.MD#api-key-generation).
- For v1, contact [Katapult Pro support](mailto:support@katapultengineering.com).

### Usage

Once you have your API key, you can start making requests to the Katapult Pro API. Our API versions are hosted at:
```sh
https://katapultpro.com/api/v3
https://katapultpro.com/api/v2
https://katapultpro.com/api/v1
```

Private server users should use their private server domain instead of katapultpro.com.

To interact with the API, send HTTP requests to the appropriate endpoint (see respective API documentation for details on endpoints). The API will respond with JSON data, which you can parse and use in your application. To get started making request, you can use an interactive tool like [Postman](https://www.postman.com/) or a command line tool like [cURL](https://curl.se/).

Programming languages like Python, JavaScript, and Ruby have methods and libraries for making HTTP requests and parsing JSON data. Here are some recommendations and resources for popular programming languages (be sure to check the documentation for your specific version of the language and determine the appropriateness of the library for your use case):

| Language | Making Requests | Parsing Responses |
| --- | --- | --- |
| bash | [cURL](https://curl.se/) | [jq](https://stedolan.github.io/jq/) |
| Python | [requests](https://docs.python-requests.org/en/latest/) | [json](https://docs.python.org/3/library/json.html) |
| JavaScript | [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) | [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) |
| Ruby | [Net::HTTP](https://ruby-doc.org/stdlib-2.7.0/libdoc/net/http/rdoc/Net/HTTP.html) | [JSON.parse](https://ruby-doc.org/stdlib-2.7.0/libdoc/json/rdoc/JSON.html#method-c-parse) |
| Java | [HttpURLConnection](https://docs.oracle.com/javase/7/docs/api/java/net/HttpURLConnection.html) | [Jackson](https://github.com/FasterXML/jackson-databind/) |

### Request Endpoints and Responses

Endpoints in a RESTful API are the URLs that you send requests to. Each endpoint corresponds to a specific resource or action in the API. Refer to the respective API documentation for a list of available endpoints and their descriptions.

Responses from the API will be in JSON format and contain information about how the request was processed, most importantly with any requested data, and whether it was successful or not. The response will also include an HTTP status code that indicates the success or failure of the request.

| HTTP Status Code | Description |
| --- | --- |
| 200 | OK - The request was successful and the response contains the requested data. |
| 400 | Bad Request - The request was invalid or malformed. |
| 401 | Unauthorized - The request did not include a valid API key or the API key is invalid. |
| 404 | Not Found - The requested resource was not found. |
| 429 | Rate Limit Exceeded - The API key used for the request has exceeded the rate limit for the API. Increase the delay between your requests to avoid this error. |
| 500 | Internal Server Error - An error occurred on the server while processing the request. |

### Getting IDs from Katapult Pro

Unlike with the Katapult Pro web application, the API primarily identifies resources by their IDs. Particularly when getting started with the API, it is helpful to work with data that is already accessible in Katapult Pro, and you can get the IDs of common resources from the Katapult Pro web application from the URL of certain pages. The following examples show how to get IDs from Desktop (/map).

| Resource | URL Example | Notes |
| --- | --- | --- |
| Job | https://katapultpro.com/map/#-MWjCEDgYy9qzw2zZ2dc | `-MWjCEDgYy9qzw2zZ2dc` is the job ID. Selecting a job from the job chooser will put this in the URL. |
| Node | https://katapultpro.com/map/#-MWjCEDgYy9qzw2zZ2dc/n-MTLZaZZiv_iMOEKc70T | `-MTLZaZZiv_iMOEKc70T` is the node ID. Selecting a node on the map will put this in the URL. Be sure to _not_ include the `n` prefix. |
| Connection | https://katapultpro.com/map/#-MWjCEDgYy9qzw2zZ2dc/c-MJ93SdtSMBWcCWdRBFN | `-MJ93SdtSMBWcCWdRBFN` is the connection ID. Selecting a connection on the map will put this in the URL. Be sure to _not_ include the `c` prefix. |
| Section | https://katapultpro.com/map/#-MWjCEDgYy9qzw2zZ2dc/s-MJ93SdtSMBWcCWdRBFN:midpoint_section | `midpoint_section` is the section ID. Selecting a section on the map will put this in the URL. Note that the section ID is the last part of the URL after the `:`. |
