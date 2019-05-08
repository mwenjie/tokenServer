using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;

namespace myauth1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.Title = "IdentityServer";

            var host = CreateWebHostBuilder(args).Build();
            /* 
            using (var scope = host.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                SeedData.EnsureSeedData(scope.ServiceProvider);
                return;
            }
            */

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseSerilog((ctx, config) =>
                    {
                        config.MinimumLevel.Debug()
                            .MinimumLevel.Debug()
                            .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                            .MinimumLevel.Override("System", LogEventLevel.Warning)
                            .MinimumLevel.Override("Microsoft.AspNetCore.Authentication", LogEventLevel.Information)
                            .Enrich.FromLogContext();

                        if (ctx.HostingEnvironment.IsDevelopment())
                        {
                            config.WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}");
                        }
                        else if (ctx.HostingEnvironment.IsProduction())
                        {
                            config.WriteTo.File(@"D:\home\LogFiles\Application\identityserver.txt",
                                fileSizeLimitBytes: 1_000_000,
                                rollOnFileSizeLimit: true,
                                shared: true,
                                flushToDiskInterval: TimeSpan.FromSeconds(1));
                        }
                    });
    }
}
