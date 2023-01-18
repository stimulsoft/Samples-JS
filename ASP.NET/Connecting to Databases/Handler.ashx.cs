/*
Stimulsoft.Reports.JS
Version: 2023.1.5
Build date: 2023.01.17
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
        public object Value { get; set; }

        [DataMember(Name = "typeGroup")]
        public string TypeGroup { get; set; }

        [DataMember(Name = "typeName")]
        public string TypeName { get; set; }

        [DataMember(Name = "typeValue")]
        public int TypeValue { get; set; }

        [DataMember(Name = "size")]
        public int Size { get; set; }
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

            result.HandlerVersion = "2023.1.5";
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