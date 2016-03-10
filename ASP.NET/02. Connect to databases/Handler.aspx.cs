using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            var command = (CommandJson)new DataContractJsonSerializer(typeof(CommandJson)).ReadObject(HttpContext.Current.Request.InputStream);
            Result result = new Result();
            if (command.Database == "MySQL") result = MySQLAdapter.Process(command);
            if (command.Database == "Firebird") result = FirebirdAdapter.Process(command);
            if (command.Database == "MS SQL") result = MSSQLAdapter.Process(command);
            if (command.Database == "PostgreSQL") result = PostgreSQLAdapter.Process(command);

            var serializer = new DataContractJsonSerializer(typeof(Result));

            serializer.WriteObject(HttpContext.Current.Response.OutputStream, result);
            HttpContext.Current.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            HttpContext.Current.Response.Headers.Add("Cache-Control", "no-cache");

            HttpContext.Current.Response.OutputStream.Flush();
            HttpContext.Current.Response.End();
        }
        catch{}
    }
}