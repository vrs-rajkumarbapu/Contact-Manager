using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ContactManagerWebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            //config.MapHttpAttributeRoutes();

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            var serializerSettings = GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings;
            var contractResolver = (DefaultContractResolver)serializerSettings.ContractResolver;
            contractResolver.IgnoreSerializableAttribute = true;
           


            config.Routes.MapHttpRoute(
             name: "ApiById",
             routeTemplate: "api/{controller}/{id}"
             , defaults: new { id = RouteParameter.Optional }
                //,constraints: new { id = @"^[0-9]+$" }
             );

            config.Routes.MapHttpRoute(
                name: "ApiBySearchString"
                , routeTemplate: "api/{controller}/{action}/{searchString}"
                , defaults: null
                );

            config.Routes.MapHttpRoute(
                name: "ApiByAction",
                routeTemplate: "api/{controller}/{action}"
                //defaults: new { action = "Get" }
                );

            //config.EnableSystemDiagnosticsTracing();
        }
    }
}
