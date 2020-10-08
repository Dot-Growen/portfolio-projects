using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using WeddingPlanner.Models;

namespace WeddingPlanner.Controllers {
    public class HomeController : Controller {

        private MyContext _context;

        public HomeController (MyContext context) {
            _context = context;
        }

        public IActionResult Index () {
            return View ();
        }

        [HttpGet ("loginpage")]
        public ViewResult LoginPage () {
            return View ();
        }

        [HttpGet ("dashboard")]
        public IActionResult Dashboard () {
            if (HttpContext.Session.GetInt32 ("UserId") == null) {
                return RedirectToAction ("loginpage");
            } else {
                ViewBag.User = _context.Users.FirstOrDefault (l => l.UserId == HttpContext.Session.GetInt32 ("UserId"));
                List<Wedding> allWeddings = _context.Weddings
                    .Include( w => w.Guest)
                    .ThenInclude (w => w.UsersWeddings)
                    .OrderBy (w => w.Date)
                    .Where(w => w.Date > DateTime.Now)
                    .ToList ();
                Console.WriteLine ($"I AM logged in. My Id => {HttpContext.Session.GetInt32 ("UserId")}");
                return View (allWeddings);
            }
        }

        [HttpGet ("new")]
        public IActionResult New () {
            ViewBag.User = _context.Users.SingleOrDefault (u => u.UserId == HttpContext.Session.GetInt32 ("UserId"));
            return View ();
        }

        [HttpGet ("wedding/{Id}")]
        public IActionResult WeddingView (int Id) {
            ViewBag.ViewUser = _context.Users
                .Include (u => u.JoinedWedding)
                .ThenInclude (u => u.WeddingsUsers)
                .SingleOrDefault (u => u.UserId == HttpContext.Session.GetInt32 ("UserId"));
            ViewBag.ViewWed = _context.Weddings
                .Where (a => a.WeddingId == Id)
                .SingleOrDefault ();
            List<User> allUsers = _context.Users
                .Include (u => u.JoinedWedding)
                .ThenInclude (u => u.UsersWeddings)
                .ToList ();
            return View (allUsers);
        }

        [HttpGet ("logout")]
        public IActionResult Logout () {
            Console.WriteLine ($"I WAS login. My Id => {HttpContext.Session.GetInt32 ("UserId")}");
            HttpContext.Session.Clear ();
            Console.WriteLine ($"NOW IM out. Id => {HttpContext.Session.GetInt32 ("UserId")}");
            return View ("loginpage");
        }

        [HttpGet ("delete/{Id}")]
        public IActionResult Delete (int Id) {
            Wedding getWedding = _context.Weddings.SingleOrDefault (a => a.WeddingId == Id);
            _context.Weddings.Remove (getWedding);
            _context.SaveChanges ();
            return RedirectToAction ("dashboard");
        }

        [HttpGet ("rsvp/{wedId}/{userId}")]
        public IActionResult Join (int wedId, int userId) {
            User ViewUser = _context.Users
                .Include (u => u.JoinedWedding)
                .ThenInclude (u => u.WeddingsUsers)
                .SingleOrDefault (u => u.UserId == userId);
            Wedding ViewWed = _context.Weddings
                .Include (a => a.Guest)
                .ThenInclude (a => a.UsersWeddings)
                .SingleOrDefault (u => u.WeddingId == wedId);
            if (ViewUser.JoinedWedding.All (u => u.WeddingId != ViewWed.WeddingId)) {
                Association newAssociation = new Association ();
                newAssociation.WeddingId = wedId;
                newAssociation.UserId = userId;
                _context.Associations.Add (newAssociation);
                _context.SaveChanges ();
                return RedirectToAction ("dashboard");
            } else {
                return RedirectToAction ("home");
            }
        }

        [HttpGet ("unrsvp/{wedId}/{userId}")]
        public IActionResult leave (int wedId, int userId) {
            Association leaving = _context.Associations.FirstOrDefault (a => a.WeddingId == wedId && a.UserId == userId);
            _context.Remove (leaving);
            _context.SaveChanges ();
            return RedirectToAction ("dashboard");
        }

        //*********** POST Request

        [HttpPost ("login")]
        public IActionResult Login (LoginUser log) {
            if (ModelState.IsValid) {
                User userInDb = _context.Users.FirstOrDefault (u => u.Email == log.LoginEmail);
                Console.WriteLine (userInDb);
                if (userInDb == null) {
                    ModelState.AddModelError ("LoginEmail", "Invalid Email/Password");
                    return View ("loginpage");
                } else {
                    var hasher = new PasswordHasher<LoginUser> ();
                    var result = hasher.VerifyHashedPassword (log, userInDb.Password, log.LoginPassword);
                    if (result == 0) {
                        ModelState.AddModelError ("LoginEmail", "Invalid Email/Password");
                        return View ("loginpage");
                    } else {
                        HttpContext.Session.SetInt32 ("UserId", userInDb.UserId);
                        return RedirectToAction ("dashboard");
                    }
                }
            } else {
                Console.WriteLine (log.LoginEmail);
                return View ("loginpage");
            }
        }

        [HttpPost ("register")]
        public IActionResult Register (User user) {
            if (ModelState.IsValid) {
                if (_context.Users.Any (u => u.Email == user.Email)) {
                    ModelState.AddModelError ("Email", "Email already in use!");
                    return View ("Index");
                } else {
                    PasswordHasher<User> Hasher = new PasswordHasher<User> ();
                    user.Password = Hasher.HashPassword (user, user.Password);
                    _context.Users.Add (user);
                    _context.SaveChanges ();
                    HttpContext.Session.SetInt32 ("UserId", user.UserId);
                    Console.WriteLine ($"User id: {user.UserId}\nFirst Name: {user.FirstName}\nLastName: {user.LastName}\nEmail: {user.Email}\nSessionId: {HttpContext.Session.GetInt32("UserId")}");
                    return RedirectToAction ("dashboard");
                }
            } else {
                return View ("Index");
            }
        }

        [HttpPost ("addwedding")]
        public IActionResult AddWedding (Wedding newWedding) {

                User NewCreator = _context.Users
                .SingleOrDefault (u => u.UserId == HttpContext.Session.GetInt32 ("UserId"));
            if (ModelState.IsValid) {
                newWedding.Creator = NewCreator.FirstName;
                _context.Weddings.Add (newWedding);
                _context.SaveChanges ();
                Console.WriteLine (newWedding.WedderOne + "&" + newWedding.WedderTwo);
                return Redirect ($"wedding/{newWedding.WeddingId}");
            } else {
                ModelState.AddModelError ("Date", "Sorry no time travel");
                return View ("New");
            }
        }

    }
}