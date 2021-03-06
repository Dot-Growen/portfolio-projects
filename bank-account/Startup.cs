using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using BankAccount.Models;

namespace BankAccount {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            services.AddSession (); // SESSION
            services.AddDbContext<MyContext> (options => options.UseSqlite ("Data Source=MyContext.db")); // Sqlite Keep above other "AddDbContext"
            services.AddDbContext<MyContext> (o => o.UseMySql (Configuration["DBInfo:ConnectionString"])); // CONTEXT/DATABASE
            services.AddControllersWithViews ();
            services.AddMvc (option => option.EnableEndpointRouting = false); // MVC
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            app.UseDeveloperExceptionPage ();
            app.UseRouting();
            app.UseStaticFiles (); // STATIC FILES
            app.UseSession (); // SESSION
            app.UseMvc (); // MVC

            app.UseEndpoints (endpoints => {
                endpoints.MapControllerRoute (
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}