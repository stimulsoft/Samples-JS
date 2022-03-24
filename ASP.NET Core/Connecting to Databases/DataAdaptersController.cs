/*
Stimulsoft.Reports.JS
Version: 2022.2.1
Build date: 2022.03.21
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

        public string Value { get; set; }

        public string TypeGroup { get; set; }
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
                    command.QueryString = ApplyQueryParameters(command.QueryString, command.Parameters, command.EscapeQueryParameters);

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

            result.HandlerVersion = "2022.2.1";
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

        private string ApplyQueryParameters(string baseSqlCommand, ParameterJson[] parameters, bool escapeQueryParameters)
        {
            if (baseSqlCommand == null || baseSqlCommand.IndexOf("@") < 0) return baseSqlCommand;

            var result = "";
            while (baseSqlCommand.IndexOf("@") >= 0 && parameters != null && parameters.Length > 0)
            {
                result += baseSqlCommand.Substring(0, baseSqlCommand.IndexOf("@"));
                baseSqlCommand = baseSqlCommand.Substring(baseSqlCommand.IndexOf("@") + 1);

                var parameterName = "";

                var regex = new Regex(@"[a-zA-Z0-9_-]");
                while (baseSqlCommand.Length > 0)
                {
                    string chr = baseSqlCommand[0].ToString();
                    if (regex.IsMatch(chr))
                    {
                        parameterName += chr;
                        baseSqlCommand = baseSqlCommand.Substring(1);
                    }
                    else break;
                }

                var parameter = parameters.ToList().Find(p => p.Name.ToLowerInvariant() == parameterName.ToLowerInvariant());
                if (parameter != null)
                {
                    if (parameter.TypeGroup != "number")
                    {
                        if (escapeQueryParameters)
                            result += "'" + parameter.Value.Replace("\\", "\\\\").Replace("'", "\\'").Replace("\"", "\\\"") + "'";
                        else
                            result += "'" + parameter.Value + "'";
                    }
                    else
                        result += parameter.Value;
                }
                else
                    result += "@" + parameterName;
            }

            return result + baseSqlCommand;
        }

        private static string ROT13(string input)
        {
            return string.Join("", input.Select(x => char.IsLetter(x) ? (x >= 65 && x <= 77) || (x >= 97 && x <= 109) ? (char)(x + 13) : (char)(x - 13) : x));
        }
    }
}
