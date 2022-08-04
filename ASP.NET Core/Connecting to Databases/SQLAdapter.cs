/*
Stimulsoft.Reports.JS
Version: 2022.3.4
Build date: 2022.08.02
License: https://www.stimulsoft.com/en/licensing/reports
*/
using FirebirdSql.Data.FirebirdClient;
using MySql.Data.MySqlClient;
using Npgsql;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data.Common;
using Microsoft.Data.SqlClient;
using System.IO;

namespace NetCoreDataAdapters
{
    public class SQLAdapter
    {
        private static DbConnection connection;
        private static DbDataReader reader;
        private static CommandJson command;

        private static Result End(Result result)
        {
            result.AdapterVersion = "2022.3.4";
            try
            {
                if (reader != null) reader.Close();
                if (connection != null) connection.Close();

                return result;
            }
            catch (Exception)
            {
                return result;
            }
        }

        private static Result OnError(string message)
        {
            return End(new Result { Success = false, Notice = message });
        }

        private static Result Connect()
        {
            try
            {
                connection.Open();
                return OnConnect();
            }
            catch (Exception e)
            {
                return OnError(e.Message);
            }
        }

        private static Result OnConnect()
        {
            if (!String.IsNullOrEmpty(command.QueryString)) return Query(command.QueryString);
            else return End(new Result { Success = true });
        }

        private static Result Query(string queryString)
        {
            try
            {
                var sqlCommand = connection.CreateCommand();
                sqlCommand.CommandText = queryString;

                reader = sqlCommand.ExecuteReader();
                return OnQuery();
            }
            catch (Exception e)
            {
                return OnError(e.Message);
            }
        }

        private static Result OnQuery()
        {
            var columns = new List<string>();
            var rows = new List<string[]>();
            var types = new List<string>();

            for (var index = 0; index < reader.FieldCount; index++)
            {
                var columnName = reader.GetName(index);
                var columnType = GetType(reader.GetDataTypeName(index));
                if (columnType == "string" && reader.GetFieldType(index).Equals(typeof(byte[])))
                    columnType = "array";

                columns.Add(columnName);
                types.Add(columnType);
            }

            while (reader.Read())
            {
                var row = new string[reader.FieldCount];
                for (var index = 0; index < reader.FieldCount; index++)
                {
                    object value = null;
                    try
                    {
                        if (!reader.IsDBNull(index))
                        {
                            value = reader.GetValue(index);
                        }
                    }
                    catch 
                    { 
                        value = null;
                    }

                    if (value == null) value = "";
                    if (value is DateTime)
                    {
                        row[index] = ((DateTime)value).ToString("yyyy-MM-dd'T'HH:mm:ss.fff");
                        types[index] = "datetime";
                    }
                    else if (value is DateTimeOffset)
                    {
                        row[index] = ((DateTimeOffset)value).ToString("yyyy-MM-dd'T'HH:mm:ss.fffK");
                        types[index] = "datetimeoffset";
                    }
                    else if (value is TimeSpan)
                    {
                        row[index] = Math.Truncate(((TimeSpan)value).TotalHours) + ":" + ((TimeSpan)value).Minutes + ":" + ((TimeSpan)value).Seconds;
                        types[index] = "time";
                    }
                    else
                    {
                        if (types[index] == "array")
                            value = GetBytes(index);

                        row[index] = value.ToString();
                    }
                }
                rows.Add(row);
            }

            return End(new Result { Success = true, Columns = columns.ToArray(), Rows = rows.ToArray(), Types = types.ToArray() });
        }

        private static string GetBytes(int index)
        {
            var size = reader.GetBytes(index, 0, null, 0, 0);
            var destination = new MemoryStream();
            var buffer = new byte[8040];
            long offset = 0;
            long read;

            while ((read = reader.GetBytes(index, offset, buffer, 0, buffer.Length)) > 0)
            {
                offset += read;
                destination.Write(buffer, 0, (int)read);
                if (size == offset) break;
            }

            return System.Convert.ToBase64String(destination.ToArray());
        }

        private static string GetType(string dbType)
        {
            if (connection is MySqlConnection)
            {
                switch (dbType.ToLowerInvariant())
                {
                    case "uniqueidentifier":
                    case "bigint":
                    case "int64":
                    case "year":
                    case "int32":
                    case "int24":
                    case "int":
                    case "int16":
                    case "smallint":
                    case "byte":
                    case "ubyte":
                    case "uint32":
                    case "uint24":
                    case "uint16":
                    case "tinyint":
                    case "uint64":
                    case "decimal":
                    case "newdecimal":
                    case "money":
                    case "smallmoney":
                    case "float":
                    case "real":
                    case "double":
                        return "number";

                    case "bit":
                        return "boolean";

                    case "newdatetime":
                    case "smalldatetime":
                    case "datetime":
                    case "date":
                    case "timestamp":
                        return "datetime";

                    case "time":
                        return "time";

                    case "blob":
                        return "array";
                }
            }
            else if (connection is FbConnection)
            {
                switch (dbType.ToLowerInvariant())
                {
                    case "bigint":
                    case "numeric":
                    case "uniqueidentifier":
                    case "int":
                    case "integer":
                    case "smallint":
                        return "int";

                    case "decimal":
                    case "money":
                    case "smallmoney":
                    case "float":
                    case "real":
                    case "double":
                        return "number";

                    case "datetime":
                    case "date":
                    case "smalldatetime":
                    case "timestamp":
                        return "datetime";

                    case "time":
                        return "time";

                    case "boolean":
                        return "boolean";

                }
            }
            else if (connection is SqlConnection)
            {
                switch (dbType.ToLowerInvariant())
                {
                    case "uniqueidentifier":
                    case "bigint":
                    case "timestamp":
                    case "int":
                    case "smallint":
                    case "tinyint":
                        return "int";

                    case "decimal":
                    case "money":
                    case "smallmoney":
                    case "float":
                    case "real":
                        return "number";

                    case "datetime":
                    case "date":
                    case "datetime2":
                    case "smalldatetime":
                        return "datetime";

                    case "time":
                        return "time";

                    case "datetimeoffset":
                        return "datetimeoffset";

                    case "bit":
                        return "boolean";

                    case "binary":
                    case "image":
                        return "array";
                }
            }
            else if (connection is NpgsqlConnection)
            {
                switch (dbType.ToLowerInvariant())
                {
                    case "bigint":
                    case "int":
                    case "int4":
                    case "int8":
                    case "integer":
                    case "numeric":
                    case "uniqueidentifier":
                    case "smallint":
                    case "tinyint":
                        return "int";

                    case "decimal":
                    case "money":
                    case "smallmoney":
                    case "float":
                    case "real":
                    case "double":
                        return "number";

                    case "abstime":
                    case "date":
                    case "datetime":
                    case "smalldatetime":
                    case "timestamp":
                    case "timestamptz":
                        return "dateTime";

                    case "time":
                        return "time";

                    case "timetz":
                        return "datetime";

                    case "boolean":
                        return "boolean";
                }
            }
            else if (connection is OracleConnection)
            {
                switch (dbType.ToUpperInvariant())
                {
                    case "BFILE":
                    case "BLOB":
                    case "LONGRAW":
                    case "RAW":
                        return "array";

                    case "DATE":
                    case "TIMESTAMP":
                    case "TIMESTAMPWITHLOCALTIMEZONE":
                    case "TIMESTAMPWITHTIMEZONE":
                        return "datetime";

                    case "INTERVALDAYTOSECOND":
                        return "time";

                    case "INTERVALYEARTOMONTH":
                        return "int";

                    case "NUMBER":
                    case "BINARY_DOUBLE":
                    case "BINARY_FLOAT":
                    case "BINARY_INTEGER":
                        return "number";
                }
            }

            return "string";
        }

        public static Result Process(CommandJson command, DbConnection connection)
        {
            SQLAdapter.connection = connection;
            SQLAdapter.command = command;
            return Connect();
        }
    }
}