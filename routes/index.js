var express = require("express");
var router = express.Router();
var Campground = require("../models/user");
var passport = require("passport");
var User = require("../models/user");

// ROUTES
router.get("/", function (req, res) {
  res.render("landing");
});

// ====================================
//  AUTHENTICATION ROUTES
// ====================================
router.get("/register", function (req, res) {
  res.render("register");
});

router.post("/register", function (req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      console.log(err);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Welcome to Yelpcamp, " + user.username + "!");
      res.redirect("/campgrounds");
    });
  });
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    successFlash: "Welcome Back!",
    failureFlash: "Incorrect credentials!",
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/campgrounds");
});

module.exports = router;
