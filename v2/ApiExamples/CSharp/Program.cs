//**********************************************************************************************
//* Name: Program GET Welcome CSharp                                                                                                    
//* Author: T2 
//* Created: 12/19/2023
//* Description: Simple API V2 calls.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any 
//*             errors or omissions in the content of this Katapult API Example. The 
//*             information contained in this software example is provided on an "as is" 
//*             basis with no guarantees of completeness, accuracy, usefulness or timeliness..                                                                     
//**********************************************************************************************
//* dotnet new console  <<< To create                                                                
//************ Packages Installed **************************************************************
//* dotnet add package Newtonsoft.Json --version 12.0.1   <<< Add package required                              
//**********************************************************************************************
//************ Packages Installed **************************************************************
//* dotnet run  <<< To run
//**********************************************************************************************                                
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace KatapultApi
{
    class Program
    {
        public static string my_api_key = "?{{API_KEY}}";
        public static string base_url = "https://katapultpro.com/api/v2";
        public static string base_url_users = "https://katapultpro.com/api/v2/users";
        public static string base_url_jobs = "https://katapultpro.com/api/v2/jobs";
        public static string job_id = "/-Nml3-QC7iem777EbKNt";

        public static async Task Main(string[] args)
        {   
            // dynamic response = await Program.getWelcome();
            // Console.WriteLine(response); 
            //dynamic response = await Program.getUsersList();
            // dynamic response = await Program.getJobsList();
            dynamic response = await Program.getJobData();
            Console.WriteLine(response);       
        }

        // Welcome Message
        public static async Task<dynamic> getWelcome() 
        {
            using var client = new HttpClient();

            var result = await client.GetStringAsync(base_url+my_api_key);
            dynamic json = JsonConvert.DeserializeObject(result);

            return json;
        }

        // Users List
        public static async Task<dynamic> getUsersList() 
        {
            using var client = new HttpClient();

            var result = await client.GetStringAsync(base_url_users+my_api_key);
            dynamic json = JsonConvert.DeserializeObject(result);

            return json;
        }   

        public static async Task<dynamic> getJobsList() 
        {
            using var client = new HttpClient();

            var result = await client.GetStringAsync(base_url_users+my_api_key);
            dynamic json = JsonConvert.DeserializeObject(result);

            return json;
        }   

        public static async Task<dynamic> getJobData() 
        {
            using var client = new HttpClient();

            var result = await client.GetStringAsync(base_url_jobs+job_id+my_api_key);
            dynamic json = JsonConvert.DeserializeObject(result);

            return json;
        }                       

    }
}