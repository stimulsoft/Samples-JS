using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Demo
{
    public partial class SendEmail : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Get exported report file as Stream
            string data = Page.Request.Params.Get("data");
            Stream stream = new MemoryStream(Convert.FromBase64String(data));

            // Get the attachment file name
            string attachmentName = Page.Request.Params.Get("fileName");
            string format = Page.Request.Params.Get("format");
            switch (format)
            {
                case "Pdf":
                    attachmentName += ".pdf";
                    break;

                case "Html":
                case "Html5":
                    attachmentName += ".html";
                    break;

                case "Word2007":
                    attachmentName += ".docx";
                    break;

                case "Excel2007":
                    attachmentName += ".xlsx";
                    break;

                case "Csv":
                    attachmentName += ".csv";
                    break;
            }

            // Prepare Email options
            StiEmailOptions options = new StiEmailOptions();
            options.AddressTo = Page.Request.Params.Get("email");
            options.Subject = Page.Request.Params.Get("subject");
            options.Body = Page.Request.Params.Get("message");

            options.AddressFrom = "**********@gmail.com";
            options.Host = "smtp.gmail.com";
            //options.Port = 465;
            options.UserName = "**********";
            options.Password = "**********";

            // Send report and get the result
            string result = SendReportEmail(stream, attachmentName, options);
            byte[] buffer = Encoding.UTF8.GetBytes(result);

            // Return result to the client
            try
            {
                HttpContext.Current.Response.StatusCode = 200;
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.ClearContent();

                HttpContext.Current.Response.Cache.SetExpires(DateTime.MinValue);
                HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);

                HttpContext.Current.Response.ContentType = "text/plain";
                HttpContext.Current.Response.ContentEncoding = Encoding.UTF8;
                HttpContext.Current.Response.AppendHeader("Content-Length", buffer.Length.ToString());

                HttpContext.Current.Response.BinaryWrite(buffer);
                
                HttpContext.Current.Response.Flush();
                HttpContext.Current.Response.End();
            }
            catch { }
        }

        public static string SendReportEmail(Stream stream, string attachmentName, StiEmailOptions options)
        {
            stream.Seek(0, SeekOrigin.Begin);

            Attachment attachment = new Attachment(stream, attachmentName);
            MailMessage message = new MailMessage(options.AddressFrom, options.AddressTo);
            message.Attachments.Add(attachment);
            message.Subject = options.Subject;
            foreach (object email in options.CC)
            {
                if (email is MailAddress) message.CC.Add((MailAddress)email);
                else message.CC.Add((string)email);
            }
            foreach (object email in options.BCC)
            {
                if (email is MailAddress) message.Bcc.Add((MailAddress)email);
                else message.Bcc.Add((string)email);
            }
            if (!string.IsNullOrEmpty(options.Body)) message.Body = options.Body;
            else message.Body = string.Format("This Email contains the '{0}' report file.", attachmentName);

            SmtpClient client = new SmtpClient(options.Host, options.Port);
            client.EnableSsl = options.EnableSsl;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(options.UserName, options.Password);

            string result = "OK";

            try
            {
                client.Send(message);
            }
            catch (Exception e)
            {
                result = e.InnerException != null ? e.InnerException.Message : e.Message;
            }

            return result;
        }
    }
}