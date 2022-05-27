const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB_CONNECT = process.env.DB_CONNECT;

// Connect to mongodb atlas
mongoose
  .connect(DB_CONNECT)
  .then(() => {
    console.log("Connect to MongoDB Atlas successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

// Router hanlder
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
