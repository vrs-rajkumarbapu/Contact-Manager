﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ContactManager.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()// Default view 
        {
            return View();
        }
        
    }
}
