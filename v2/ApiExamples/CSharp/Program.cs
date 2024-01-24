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
        public static string my_api_key = "?qAgRiXGKu7wrvsgoUIaZFAfXMDmdtN3F05EPVt6if1Ol84oUiUiSgC9JNL_FhlSHLte5MH-ymaKaQ3ctye687DmE0JqPZw2xMLoH2wlGyKlqMVmhjxoqdzRYBJMHw7CYwsLQ63_2W57ksY3PZQ4IVclnk4lP6Kug6s-0o5xDStrtpBdAmysnejSKEhZkHTdkg5oOYrcQ6EItF95dkCdOVms8acN_xl6i4C-nqzXU5LDSHIcVv6soOJGMpvCWQ7swIJabsJRNnHgt-cBy1WdMUlAp0s9HSOhVHdIBJWGKPPkk9DMWHuvfOEszVdepnC-7OdwwLUMybY3a21HkfPHv5g";
        public static string base_url = "https://katapultpro.com/api/v2";
        public static string base_url_users = "https://katapultpro.com/api/v2/users";
        public static string base_url_jobs = "https://katapultpro.com/api/v2/jobs";
        public static string job_id = "/-Nml3-QC7iem777EbKNt";
        public static string path_list = "/nodes";

        public static async Task Main(string[] args)
        {   
            //dynamic response = await Program.getWelcome();
            // Console.WriteLine(response); 
            //dynamic response = await Program.getUsersList();
            // dynamic response = await Program.getJobsList();
            // dynamic response = await Program.getJobData();
            dynamic response = await Program.getPartialJobData();
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

        public static async Task<dynamic> getPartialJobData() 
        {
            using var client = new HttpClient();

            var result = await client.GetStringAsync(base_url_jobs+job_id+path_list+my_api_key);
            dynamic json = JsonConvert.DeserializeObject(result);

            return json;
        } 

    }
}