/*
Stimulsoft.Reports.JS
Version: 2023.1.6
Build date: 2023.01.25
License: https://www.stimulsoft.com/en/licensing/reports
*/
using FirebirdSql.Data.FirebirdClient;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using MySql.Data.MySqlClient;
using Npgsql;
using Oracle.ManagedDataAccess.Client;
using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace NetCoreDataAdapters
{
    public class Result
    {
        public bool Success { get; set; }

        public string Notice { get; set; }

        public string[] Columns { get; set; }

        public string[][] Rows { get; set; }

        public string[] Types { get; set; }

        public string AdapterVersion { get; set; }

        public string HandlerVersion { get; set; }

        public bool CheckVersion { get; set; }
    }

    public class CommandJson
    {
        public string Command { get; set; }

        public string ConnectionString { get; set; }

        public string Database { get; set; }

        public string QueryString { get; set; }

        public int Timeout { get; set; }

        public ParameterJson[] Parameters { get; set; }

        public bool EscapeQueryParameters { get; set; }
    }

    public class ParameterJson
    {
        public string Name { get; set; }

        public object Value { get; set; }

        public string TypeGroup { get; set; }

        public string TypeName { get; set; }

        public int TypeValue { get; set; }

        public int Size { get; set; }
    }

    [Route("/DataAdapters")]
    [ApiController]
    public class DataAdaptersController : ControllerBase
    {
        [HttpGet]
        public async Task GetCommand()
        {
            await ProcessRequest();
        }

        [HttpPost]
        public async Task PostCommand()
        {
            await ProcessRequest();
        }

        private JsonSerializerOptions jsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        private Regex serverCertificateRegex = new Regex(@"Trust\s*Server\s*Certificate\s*=", RegexOptions.Compiled | RegexOptions.IgnoreCase);

        private async Task ProcessRequest()
        {
            var result = new Result { Success = true };
            var encodeResult = false;

            try
            {
                string inputText;
                using (StreamReader stream = new StreamReader(Request.Body))
                {
                    inputText = await stream.ReadToEndAsync();
                }

                if (!string.IsNullOrEmpty(inputText) && inputText[0] != '{')
                {
                    var buffer = Convert.FromBase64String(ROT13(inputText));
                    inputText = Encoding.UTF8.GetString(buffer);
                    encodeResult = true;
                }

                var command = JsonSerializer.Deserialize<CommandJson>(inputText, jsonOptions);

                if (command.Command == "GetSupportedAdapters")
                {
                    result.Success = true;
                    result.Types = new string[] { "MySQL", "Firebird", "MS SQL", "PostgreSQL", "Oracle" };
                }
                else
                {
                    switch (command.Database)
                    {
                        case "MySQL": result = SQLAdapter.Process(command, new MySqlConnection(command.ConnectionString)); break;
                        case "Firebird": result = SQLAdapter.Process(command, new FbConnection(command.ConnectionString)); break;
                        case "MS SQL":
                            if (!serverCertificateRegex.IsMatch(command.ConnectionString))
                                command.ConnectionString += (command.ConnectionString.TrimEnd().EndsWith(";") ? "" : ";") + "TrustServerCertificate=true;";
                            result = SQLAdapter.Process(command, new SqlConnection(command.ConnectionString));
                            break;
                        case "PostgreSQL": result = SQLAdapter.Process(command, new NpgsqlConnection(command.ConnectionString)); break;
                        case "Oracle": result = SQLAdapter.Process(command, new OracleConnection(command.ConnectionString)); break;
                        default: result.Success = false; result.Notice = $"Unknown database type [{command.Database}]"; break;
                    }
                }
            }
            catch (Exception e)
            {
                result.Success = false;
                result.Notice = e.Message;
            }

            result.HandlerVersion = "2023.1.6";
            result.CheckVersion = true;

            var contentType = "application/json";
            var resultText = JsonSerializer.Serialize(result, jsonOptions);
            if (encodeResult)
            {
                resultText = ROT13(Convert.ToBase64String(Encoding.UTF8.GetBytes(resultText)));
                contentType = "text/plain";
            }

            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Headers.Add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Engaged-Auth-Token");
            Response.Headers.Add("Cache-Control", "no-cache");
            Response.ContentType = contentType;
            await Response.WriteAsync(resultText);
            await Response.CompleteAsync();
        }

        private static string ROT13(string input)
        {
            return string.Join("", input.Select(x => char.IsLetter(x) ? (x >= 65 && x <= 77) || (x >= 97 && x <= 109) ? (char)(x + 13) : (char)(x - 13) : x));
        }
    }
}
