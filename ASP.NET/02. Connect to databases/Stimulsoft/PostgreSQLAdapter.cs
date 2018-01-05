using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public class PostgreSQLAdapter
{
    private static NpgsqlConnection connection;
    private static NpgsqlDataReader reader;
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

    private static Result OnError(string message)
    {
        return End(new Result { Success = false, Notice = message });
    }

    private static Result Connect()
    {
        try
        {
            connection = new NpgsqlConnection(command.ConnectionString);
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
            var sqlCommand = new NpgsqlCommand(queryString, connection);
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

        for (var index = 0; index < reader.FieldCount; index++)
        {
            columns.Add(reader.GetName(index));
        }

        while (reader.Read())
        {
            var row = new string[reader.FieldCount];
            for (var index = 0; index < reader.FieldCount; index++)
            {
                object value = null;
                if (!reader.IsDBNull(index)) value = reader.GetValue(index);
                if (value == null) value = "";
                row[index] = value.ToString();
            }
            rows.Add(row);
        }

        return End(new Result { Success = true, Columns = columns.ToArray(), Rows = rows.ToArray() });
    }

    public static Result Process(CommandJson command)
    {
        PostgreSQLAdapter.command = command;
        return Connect();
    }
}