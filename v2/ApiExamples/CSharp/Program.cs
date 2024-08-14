// //**********************************************************************************************
// //* Name: API Examples Program CSharp                                                                                                    
// //* Author: T2 
// //* Created: 1/19/2024
// //* Description: Simple API V2 calls.
// //* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
// //*             errors or omissions in the content of this Katapult API Example. The 
// //*             information contained in this software example is provided on an "as is" 
// //*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..                                                                     
// //**********************************************************************************************
// //* dotnet new console  <<< To create                                                                
// //************ Packages Installed **************************************************************
// //* dotnet add package Newtonsoft.Json --version 12.0.1   <<< Add package required                              
// //**********************************************************************************************
// //************ Packages Installed **************************************************************
// //* dotnet run  <<< To run
// //**********************************************************************************************                                
// using System;
// using System.Net.Http;
// using System.Threading.Tasks;
// using Newtonsoft.Json;

// namespace KatapultApi
// {
//     class Program
//     {
//         public static string my_api_key = "api_key=sJ3zygFJN_ZU81-3I8w0VLZvFUst_5L-2uuVzXubYbFeAP7vr52VRc1BMlIOQ0bHks1EfMSe8rBYhNHfoec9kBjj9wsYJPXseA8gb1cOhBC6Ne8MVceNs4kz5wiNDuHtECn0tM41pYlMYJ8eSKe75F_Ct4GfWO15sVg2sRGvw5kMfmfnbUEmYd6Cx_a6lAPXcaxW4ZdkRgRajYqKA-58oXYOIKpP9Buna74ZgzYPdAXVTmtE3oKkpUzLUQaLdKtgLzn7JaTkRo_RnFpe54Pwt7GVn8mxtCAAA3nDCqX-FmTi9PcIqwU-Lxoxqm6aUy4Mu4rvSj9adVYRR8qUVwEtog";
//         public static string base_url = "https://training.katapultpro.com/api/v2";
//         public static string base_url_users = "https://katapultpro.com/api/v2/users";
//         public static string base_url_jobs = "https://training.katapultpro.com/api/v2/jobs";
//         public static string base_url_updatedjobslist = "https://katapultpro.com/api/v2/updatedJobsList";
//         public static string job_id = "/-Nml3-QC7iem777EbKNt";
//         public static string path_list = "/nodes";
//         public static string from_date = "?fromDate=2023-11-28T18:09:07.282Z";
//         public static string to_date = "&toDate=11/29/23";
//         public static string use_today = "&useToday=true";
//         public static string page_num = "&page=1";


//         public static async Task Main(string[] args)
//         {   
//              dynamic response = await Program.getWelcome();
//             // dynamic response = await Program.getUsersList();
//             // dynamic response = await Program.getJobsList();
//             // dynamic response = await Program.getJobData();
//             // dynamic response = await Program.getPartialJobData();
//             // dynamic response = await Program.getupdatedJobsList();
//             //dynamic response = await Program.postCreateNode();
//             Console.WriteLine(response);       
//         }

//         // Welcome Message
//         public static async Task<dynamic> getWelcome() 
//         {
//             using var client = new HttpClient();
//             var result = await client.GetStringAsync(base_url + "?" + my_api_key);
//             dynamic json = JsonConvert.DeserializeObject(result);

//             return json;
//         }

//         // Users List
//         public static async Task<dynamic> getUsersList() 
//         {
//             using var client = new HttpClient();

//             var result = await client.GetStringAsync(base_url_users + "?" + my_api_key);
//             dynamic json = JsonConvert.DeserializeObject(result);

//             return json;
//         }   

//         public static async Task<dynamic> getJobsList() 
//         {
//             using var client = new HttpClient();

//             var result = await client.GetStringAsync(base_url_jobs+"?"+my_api_key);
//             dynamic json = JsonConvert.DeserializeObject(result);

//             return json;
//         }   

//         public static async Task<dynamic> getupdatedJobsList() 
//         {
//             using var client = new HttpClient();

//             var result = await client.GetStringAsync(base_url_users+"?"+my_api_key);
//             dynamic json = JsonConvert.DeserializeObject(result);

//             return json;
//         }   

//         public static async Task<dynamic> getJobData() 
//         {
//             using var client = new HttpClient();

//             var result = await client.GetStringAsync(base_url_jobs+job_id+"?"+my_api_key);
//             dynamic json = JsonConvert.DeserializeObject(result);

//             return json;
//         } 

//         public static async Task<dynamic> getPartialJobData() 
//         {
//             using var client = new HttpClient();

//             var result = await client.GetStringAsync(base_url_updatedjobslist+to_date+from_date+use_today+page_num+"&"+my_api_key);
//             dynamic json = JsonConvert.DeserializeObject(result);

//             return json;
//         } 

//         public static async Task<dynamic> postCreateNode()
//         {
//             Console.WriteLine("Hello, World!");
//         }

//     }
// }