using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

public class MySQLAdapter
{
    private static MySqlConnection connection;
    private static MySqlDataReader reader;
    private static CommandJson command;
    
    private static Result End(Result result) 
    {
        try 
        {
            if (reader != null) reader.Close();
            if (connection != null) connection.Close();

            return result;
        }
        catch (Exception e) 
        {
            return result;
        }
    }
    
    private static Result OnError(string message) {
        return End(new Result { Success = false, Notice = message });
    }

    private static Result Connect() {
        try
        {
            connection = new MySqlConnection(command.ConnectionString);
            connection.Open();
            return OnConnect();
        }
        catch(Exception e)
        {
            return OnError(e.Message);
        }
    }

    private static Result OnConnect() {
        if (!String.IsNullOrEmpty(command.QueryString)) return Query(command.QueryString);
        else return End(new Result { Success = true });
    }

    private static Result Query(string queryString) {
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
            var columnType = MySQLAdapter.GetType(reader.GetFieldType(index));

            columns.Add(columnName);
            types.Add(columnType);
        }

        while (reader.Read())
        {
            var row = new string[reader.FieldCount];
            for (var index = 0; index < reader.FieldCount; index++)
            {
                var columnName = reader.GetName(index);
                var columnType = MySQLAdapter.GetType(reader.GetFieldType(index));

                var columnIndex = columns.IndexOf(columnName);
                if (types[columnIndex] != "array") types[columnIndex] = columnType;
                object value = null;
                if (!reader.IsDBNull(index))
                {
                    if (columnType == "array")
                    {
                        value = MySQLAdapter.GetBytes(index);
                    }
                    else value = reader.GetValue(index);
                }

                if (value == null) value = "";
                row[index] = value.ToString();
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

    private static string GetType(Type columnType)
    {
        var typeCode = Type.GetTypeCode(columnType);

        if ((int)typeCode >= 5 && (int)typeCode <= 15) return "number";
        if ((int)typeCode == 1) return "array";

        return "string";
    }

    public static Result Process(CommandJson command)
    {
        MySQLAdapter.command = command;
        return Connect();
    }
}