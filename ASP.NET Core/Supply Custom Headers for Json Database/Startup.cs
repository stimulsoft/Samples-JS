using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
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
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();

                endpoints.MapGet("/GetReport", async context =>
                {
                    if (await SendJsonFile(context, env, "SimpleListWithProtectedJson.mrt")) return;
                    context.Response.StatusCode = 404;
                });

                endpoints.MapGet("/GetJson", async context =>
                {
                    if (context.Request.Headers["x-auth-token"] == "*YOUR TOKEN*")
                    {
                        if (await SendJsonFile(context, env, "ProtectedDemo.json")) return;
                    }
                    context.Response.StatusCode = 403;
                });
            });
        }

        private async Task<bool> SendJsonFile(HttpContext context, IWebHostEnvironment env, string FileName)
        {
            var fileInfo = env.WebRootFileProvider.GetFileInfo(string.Format("Reports/{0}", FileName));
            if (fileInfo.Exists)
            {
                context.Response.Headers.Add("Content-Type", "application/json; charset=utf-8");
                using (var reportStream = fileInfo.CreateReadStream())
                {
                    await reportStream.CopyToAsync(context.Response.Body);
                }
                await context.Response.CompleteAsync();
                return true;
            }
            return false;
        }
    }
}
