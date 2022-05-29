const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth-route");
const profileRoute = require("./routes/profile-route");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

// middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);
app.use("/profile", profileRoute);

// Get DB_CONNECT from environment variable.
const DB_CONNECT = process.env.DB_CONNECT;

// Connect to MongoDB Atlas.
mongoose
  .connect(DB_CONNECT)
  .then(() => {
    console.log("Connect to MongoDB Atlas successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

// Default route
app.get("/", (req, res) => {
  // Render index.ejs in views folder
  res.render("index", { user: req.user });
});

// Listen on 8080 port
app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
