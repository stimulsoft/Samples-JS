using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Example
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRazorPages();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            var provider = new FileExtensionContentTypeProvider();
            provider.Mappings[".mrt"] = "application/octet-stream";
            app.UseStaticFiles(new StaticFileOptions { 
                ContentTypeProvider = provider
            });

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();

                endpoints.MapPost("/SendEmail", OnSendEmail);
            });
        }

        private async Task OnSendEmail(HttpContext context)
        {
            string data = context.Request.Form["data"];
            Stream stream = new MemoryStream(Convert.FromBase64String(data));

            string attachmentName = context.Request.Form["fileName"];
            string format = context.Request.Form["format"];
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
            options.AddressTo = context.Request.Form["email"];
            options.Subject = context.Request.Form["subject"];
            options.Body = context.Request.Form["message"];

            options.AddressFrom = "**********@gmail.com";
            options.Host = "smtp.gmail.com";
            options.Port = 587;
            options.UserName = "**********";
            options.Password = "**********";
            options.EnableSsl = true;

            // Send report and get the result
            string result = await SendReportEmail(stream, attachmentName, options);

            // Return result to the client
            try
            {
                context.Response.StatusCode = 200;
                context.Response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
                context.Response.Headers.Add("Cache-Control", "no-cache");

                await context.Response.WriteAsync(result, Encoding.UTF8);

                await context.Response.CompleteAsync();
            }
            catch { }
        }

        private static async Task<string> SendReportEmail(Stream stream, string attachmentName, StiEmailOptions options)
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
                await client.SendMailAsync(message);
            }
            catch (Exception e)
            {
                result = e.InnerException != null ? e.InnerException.Message : e.Message;
            }

            return result;
        }
    }
}
