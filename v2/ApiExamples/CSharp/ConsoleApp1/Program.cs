//**********************************************************************************************
//* Name: API Examples Program CSharp                                                                                                    
//* Author: T2 
//* Created: 1/19/2024
//* Description: Simple API V2 calls.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
//*             errors or omissions in the content of this Katapult API Example. The 
//*             information contained in this software example is provided on an "as is" 
//*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..                                                                     
//**********************************************************************************************
//* dotnet new console  <<< To create                                                                
//************ Packages Installed **************************************************************
//* dotnet add package Newtonsoft.Json --version 13.0.1   <<< Add package required                              
//**********************************************************************************************
//************ Packages Installed **************************************************************
//* dotnet run  <<< To run
//**********************************************************************************************                                
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Text;
using Microsoft.VisualBasic;

namespace KatapultApi
{
    class Program
    {
        public static string my_api_key = "api_key={{API_KEY}}";
        public static string base_url = "https://training.katapultpro.com/api/v2";
        public static string base_url_users = "https://katapultpro.com/api/v2/users";
        public static string base_url_jobs = "https://training.katapultpro.com/api/v2/jobs";
        public static string base_url_updatedjobslist = "https://katapultpro.com/api/v2/updatedJobsList";
        public static string job_id = "/-O0AVVbpV-M0Mp8JbVE7";
        public static string node_id = "/-O0AVbHZTCKRGVaXqbP8";
        public static string path_list = "/connections";
        public static string from_date = "?fromDate=2023-11-28T18:09:07.282Z";
        public static string to_date = "&toDate=11/29/23";
        public static string use_today = "&useToday=true";
        public static string page_num = "&page=1";
        public static string connection_id = "/-O4H3Zm036Kg8B3urjeV";
        public static string path_list_2 = "/sections";
        public static string section_id = "/-O4H42xVu0bR_oBjSAWK";

        //public static string node_id = "/"

        public class Nodes
        {
            public double latitude { get; set; }
            public double longitude { get; set; }
            public Attribute[] attributes { get; set; } 
        }

        public class Attribute
        {
            public string attribute { get; set; }
            public string value { get; set;}
        }

        public class NodeRequest
        {
            public Nodes[] nodes{ get; set;}
        }

        public class patchNode{
            public double latitude { get; set; }
            public double longitude { get; set; }
            public Attribute[] attributes { get; set; } 
        }

        public class jobData{
            public string name { get; set; }
            public string mapStyles { get; set; }
            public string model { get; set; }
        }
        public static async Task Main(string[] args)
        {   
            // dynamic response = await Program.getWelcome();
            // dynamic response = await Program.getUsersList();
            // dynamic response = await Program.getJobsList();
            // dynamic response = await Program.getJobData();
            // dynamic response = await Program.getPartialJobData();
            // dynamic response = await Program.getupdatedJobsList();
            // dynamic response =  await Program.postCreateNode();
            // dynamic response = await Program.patchUpdateNode();
            // dynamic response = await Program.postCreateJob();
            // dynamic response = await Program.putPhotoNode();
            dynamic response = await Program.putPhotoSection();
            Console.WriteLine(response);       
        }

        // Welcome Message
        public static async Task<dynamic> getWelcome() 
        {
            using var client = new HttpClient();
            var result = await client.GetStringAsync(base_url + "?" + my_api_key);
            dynamic json = JsonConvert.DeserializeObject(result);

            return json;
        }

        // Users List
        public static async Task<dynamic> getUsersList() 
        {
            using var client = new HttpClient();

            var result = await client.GetStringAsync(base_url_users + "?" + my_api_key);
            dynamic json = JsonConvert.DeserializeObject(result);

            return json;
        }   

        public static async Task<dynamic> getJobsList() 
        {
            using var client = new HttpClient();

            var result = await client.GetStringAsync(base_url_jobs+"?"+my_api_key);
            dynamic json = JsonConvert.DeserializeObject(result);

            return json;
        }   

        public static async Task<dynamic> getupdatedJobsList() 
        {
            using var client = new HttpClient();

            var result = await client.GetStringAsync(base_url_users+"?"+my_api_key);
            dynamic json = JsonConvert.DeserializeObject(result);

            return json;
        }   

        public static async Task<dynamic> getJobData() 
        {
            using var client = new HttpClient();

            var result = await client.GetStringAsync(base_url_jobs+job_id+"?"+my_api_key);
            dynamic json = JsonConvert.DeserializeObject(result);

            return json;
        } 

        public static async Task<dynamic> getPartialJobData() 
        {
            using var client = new HttpClient();

            var result = await client.GetStringAsync(base_url_updatedjobslist+to_date+from_date+use_today+page_num+"?"+my_api_key);
            dynamic json = JsonConvert.DeserializeObject(result);

            return json;
        } 

        public static async Task<dynamic> postCreateNode()
        
        {
            HttpClient client = new HttpClient();
            var NodeRequest = new NodeRequest
            {
                nodes = new Nodes[]
                {
                    new Nodes{
                        latitude = 41.1085310,
                        longitude = -77.0336775,
                        attributes = new Attribute[]
                        {
                            new Attribute {attribute = "node_type", value = "pole"}
                        }
                    }
                },
                
            };
            var json  = JsonConvert.SerializeObject(NodeRequest);
            Console.WriteLine(json);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var URL = $"{base_url_jobs}{job_id}{path_list}?{my_api_key}";
            var response = await client.PostAsync(URL, data);
            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                dynamic result = JsonConvert.DeserializeObject(responseData);
                return result;

            }else{
                return null;
            }
        }

        public static async Task<dynamic> patchUpdateNode()
        {
            HttpClient client = new HttpClient();
            
            var node = new patchNode{
                latitude = 41.108596,
                longitude = -77.0336775,
                attributes = new Attribute[]
                {
                    new Attribute {attribute = "node_type", value = "pole"}
                }

            };
            var url = $"{base_url_jobs}{job_id}{path_list}{node_id}?{my_api_key}";
            var json  = JsonConvert.SerializeObject(node);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PatchAsync(url, data);
            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                dynamic result = JsonConvert.DeserializeObject(responseData);
                return result;

            }else{
                return null;
            }
        }

        public static async Task<dynamic> postCreateJob()
        {
            HttpClient client = new HttpClient();

            var data = new jobData{
                name = "C# TEST",
                mapStyles = "default",
                model = "Katapult"
            };
            var url = $"{base_url_jobs}?{my_api_key}";
            var json = JsonConvert.SerializeObject(data);
            var value = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync(url, value);
            if(response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                dynamic result = JsonConvert.DeserializeObject(responseData);
                return result;
            }
            else{
                return null;
            }
        }

        public static async Task<dynamic> putPhotoNode()
        {
            HttpClient client = new HttpClient();

            byte [] data = File.ReadAllBytes("Cat03.jpg");
            var url = $"{base_url_jobs}{job_id}{path_list}{node_id}/photos?{my_api_key}";
            Console.WriteLine(url);
            var content = new ByteArrayContent(data);
            content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpeg");
            var response = await client.PutAsync(url, content);
             if(response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                dynamic result = JsonConvert.DeserializeObject(responseData);
                return result;
            }
            else{
                return null;
            }
        }

         public static async Task<dynamic> putPhotoSection()
        {
            HttpClient client = new HttpClient();

            byte [] data = File.ReadAllBytes("Cat03.jpg");
            var url = $"{base_url_jobs}{job_id}{path_list}{connection_id}{path_list_2}{section_id}/photos?{my_api_key}";
            Console.WriteLine(url);
            var content = new ByteArrayContent(data);
            content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpeg");
            var response = await client.PutAsync(url, content);
             if(response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                dynamic result = JsonConvert.DeserializeObject(responseData);
                return result;
            }
            else{
                return null;
            }
        }
    }
}


