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
        var isColumnsFill = false;

        while (reader.Read())
        {
            var row = new string[reader.FieldCount];
            for (var index = 0; index < reader.FieldCount; index++)
            {
                if (!isColumnsFill) columns.Add(reader.GetName(index));
                var value = "";
                if (!reader.IsDBNull(index)) value = reader.GetString(index);
                row[index] = value;
            }
            rows.Add(row);
            isColumnsFill = true;
        }

        return End(new Result { Success = true, Columns = columns.ToArray(), Rows = rows.ToArray() });
    }

    public static Result Process(CommandJson command)
    {
        PostgreSQLAdapter.command = command;
        return Connect();
    }
}