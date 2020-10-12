var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  seedDB = require("./seed"),
  dotenv = require("dotenv");

var indexRoutes = require("./routes/index"),
  commentRoutes = require("./routes/comments"),
  campgroundsRoutes = require("./routes/campgrounds");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

dotenv.config();

console.log(typeof process.env.DATABASEURL);

// connecting db
mongoose
  .connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to YelpCamp DB!"))
  .catch((error) => console.log(error.message));

// seedDB();

// Passport Configurations
app.use(
  require("express-session")({
    secret: "YelpCamp is Ad-free!",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// user defined middleware - this makes req.user variable available to all the routes and templates
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, function () {
  console.log(`The YelpCamp Server is running on port ${process.env.PORT}`);
});
