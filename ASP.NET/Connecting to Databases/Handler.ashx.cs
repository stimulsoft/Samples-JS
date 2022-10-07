/*
Stimulsoft.Reports.JS
Version: 2022.4.2
Build date: 2022.10.06
License: https://www.stimulsoft.com/en/licensing/reports
*/
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using FirebirdSql.Data.FirebirdClient;
using MySql.Data.MySqlClient;
using Npgsql;
using Oracle.ManagedDataAccess.Client;

namespace AspNetDataAdapters
{
    #region Result
    [DataContract]
    public class Result
    {
        [DataMember(Name = "success")]
        public bool Success { get; set; }

        [DataMember(Name = "notice")]
        public string Notice { get; set; }

        [DataMember(Name = "columns")]
        public string[] Columns { get; set; }

        [DataMember(Name = "rows")]
        public string[][] Rows { get; set; }

        [DataMember(Name = "types")]
        public string[] Types { get; set; }

        [DataMember(Name = "adapterVersion")]
        public string AdapterVersion { get; set; }

        [DataMember(Name = "handlerVersion")]
        public string HandlerVersion { get; set; }

        [DataMember(Name = "checkVersion")]
        public bool CheckVersion { get; set; }
    }
    #endregion

    #region Command

    [DataContract]
    public class CommandJson
    {
        [DataMember(Name = "command")]
        public string Command { get; set; }

        [DataMember(Name = "connectionString")]
        public string ConnectionString { get; set; }

        [DataMember(Name = "database")]
        public string Database { get; set; }

        [DataMember(Name = "queryString")]
        public string QueryString { get; set; }

        [DataMember(Name = "timeout")]
        public int Timeout { get; set; }

        [DataMember(Name = "parameters")]
        public ParameterJson[] Parameters { get; set; }

        [DataMember(Name = "escapeQueryParameters")]
        public bool EscapeQueryParameters { get; set; }
    }

    [DataContract]
    public class ParameterJson
    {
        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "value")]
        public string Value { get; set; }

        [DataMember(Name = "typeGroup")]
        public string TypeGroup { get; set; }
    }
    #endregion

    /// <summary>
    /// Summary description for Handler
    /// </summary>
    public class Handler : IHttpHandler
    {
        #region Helpers
        private static string ROT13(string input)
        {
            return string.Join("", input.Select(x => char.IsLetter(x) ? (x >= 65 && x <= 77) || (x >= 97 && x <= 109) ? (char)(x + 13) : (char)(x - 13) : x));
        }
        #endregion

        #region Process request
        public void ProcessRequest(HttpContext context)
        {
            var inputStream = context.Request.InputStream;
            var result = new Result();
            var encodeResult = false;

            try
            {
                var reader = new StreamReader(context.Request.InputStream);
                var inputText = reader.ReadToEnd();
                if (!string.IsNullOrEmpty(inputText) && inputText[0] != '{')
                {
                    var buffer = Convert.FromBase64String(ROT13(inputText));
                    inputStream = new MemoryStream(buffer);
                    encodeResult = true;
                }

                inputStream.Position = 0;

                var deserializer = new DataContractJsonSerializer(typeof(CommandJson));
                var command = (CommandJson)deserializer.ReadObject(inputStream);
                
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
                        case "MS SQL": result = SQLAdapter.Process(command, new SqlConnection(command.ConnectionString)); break;
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
            finally
            {
                if (inputStream != context.Request.InputStream)
                    inputStream.Close();
            }

            result.HandlerVersion = "2022.4.2";
            result.CheckVersion = true;
            
            context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            context.Response.Headers.Add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Engaged-Auth-Token");
            context.Response.Headers.Add("Cache-Control", "no-cache");

            var serializer = new DataContractJsonSerializer(typeof(Result));
            if (encodeResult)
            {
                context.Response.ContentType = "text/plain";
                using (var tmpStream = new MemoryStream())
                {                    
                    serializer.WriteObject(tmpStream, result);
                    context.Response.Write(ROT13(Convert.ToBase64String(tmpStream.ToArray())));
                }
            }
            else
            {
                context.Response.ContentType = "application/json";
                serializer.WriteObject(context.Response.OutputStream, result);
            }
            
            context.Response.OutputStream.Flush();
            context.Response.End();
        }

        public string ApplyQueryParameters(string baseSqlCommand, ParameterJson[] parameters, bool escapeQueryParameters)
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

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
        #endregion
    }
}