using FirebirdSql.Data.FirebirdClient;
using System;
using System.Collections.Generic;

public class FirebirdAdapter
{
    private static FbConnection connection;
    private static FbDataReader reader;
    private static CommandJson command;

    private static Result End(Result result)
    {
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
            connection = new FbConnection(command.ConnectionString);
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
            var sqlCommand = new FbCommand(queryString, connection);
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
        FirebirdAdapter.command = command;
        return Connect();
    }
}