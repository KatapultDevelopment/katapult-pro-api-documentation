# ***Katapult Pro API***
***Welcome to the Katapult Pro API!***

## Introduction
“What is an API?” API is the acronym for application programming interface — a software intermediary that allows a user to programmatically access the backend of a PC/Web-based application without using the frontend user interface. Typically, applications have a backend engine that allows for easy storage, search, and manipulation of data of which a frontend application is added to provide a user-friendly interface for day-to-day data entry. In our case, Katapult has provided an API that allows users to access their company firebase data without the use of the Katapult Pro frontend.

## Usage
Customers use the API in order to facilitate operations required to programmatically manipulate their company firebase database in many ways. Here are some examples to note that make this powerful for our users. 
* Third Party integrations - There are numerous data management software packages in use by our customers that helps them organize their Company workflows. We do not specifically build a complete solution for direct integration, however, customers have used our API to populate their Katapult Pro database with information from other databases.

## API Response Format
Responses returned from the API directly will have a JSON format. This will make it easier to identify if the API had an issue with a request or the cloud server itself has had an issue with the request. A typical response without error should be returned as shown below.

***Response to PUT(200)***
```javascript
{
    "message": "OK"
}
```
**Response to Invalid API Key**
```json
{
    "error": "INVALID API KEY"
}
```
**Response to Welcome Message**
```json
{
    "message": "Welcome to the Katapult Pro API"
}
```
**Bad response to GET Job Data**
```json
{
    "error": "PERMISSION_DENIED"
}
```
***Error Response (500)***
```json
{
    "error": "Internal Server Error"
}
```
Server error codes, like 500, that do not have an associated JSON response indicates that your request has not made it to the API interface. This error has not been returned by the API and is likely an error in handling the transmission of the API call.

## Job ID
Theuser can open a Katapult Pro job and look to the url to obtain the actual JobId. In the example below, the JobId is “-MWjCEDgYy9qzw2zZ2dc,” which is the ID after the ‘#’ sign in the url.

//katapultpro.com/map/#-MWjCEDgYy9qzw2zZ2dc

## Node ID
The Node ID can be derived by using the same method above. The Node ID in the example below is “-MTLZaZZiv_iMOEKc70T,” which is the ID after the ‘n’ in the url.

//katapultpro.com/map/#-MWjCEDgYy9qzw2zZ2dc/n-MTLZaZZiv_iMOEKc70T

## Connection ID
The Connect ID is similar to Node ID. The Connection ID in the example below is “-MJ93SdtSMBWcCWdRBFN,” which is the ID after the ‘c’ in the url.

//katapultpro.com/map/#-MWjCEDgYy9qzw2zZ2dc/c-MJ93SdtSMBWcCWdRBFN

## Section ID
Similar to Connection and Node, the Section ID in the example below is “-MJ93SdtSMBWcCWdRBFN,” which is the ID after the ‘s’ in the url.

//katapultpro.com/map/#-MWjCEDgYy9qzw2zZ2dc/s-MJ93SdtSMBWcCWdRBFN:midpoint_section

# Version Specific Documentation
# Katapult Pro API V1
# [Katapult Pro API V2](v2/DocumentationV2.MD)

