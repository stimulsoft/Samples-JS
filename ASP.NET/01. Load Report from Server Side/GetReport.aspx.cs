using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Text;

namespace Demo
{
    public partial class GetReport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Get the report ID
            var reportId = Page.Request.QueryString["id"];
            if (!string.IsNullOrEmpty(reportId))
            {
                // Calculate the path to the report file
                var reportPath = Server.MapPath(string.Format("Reports/{0}.mrt", reportId));
                if (File.Exists(reportPath))
                {
                    // Load report to the buffer
                    var buffer = File.ReadAllBytes(reportPath);

                    // Sent a report to the client side as JSON data
                    this.Response.ClearContent();
                    this.Response.ClearHeaders();
                    this.Response.ContentType = "application/json";
                    this.Response.ContentEncoding = Encoding.UTF8;
                    this.Response.AddHeader("Content-Length", buffer.Length.ToString());
                    this.Response.BinaryWrite(buffer);
                    this.Response.End();
                }
            }
        }
    }
}