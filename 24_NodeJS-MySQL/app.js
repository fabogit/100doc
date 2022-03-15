const path = require("path");

const express = require("express");

const blogRoutes = require("./routes/blog");

const app = express();

// Activate EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
// Serve static files (e.g. CSS files)
app.use(express.static("public"));

app.use(blogRoutes);

// Default error handling function
// Will become active whenever any route / middleware crashes
app.use(function (error, req, res, next) {
  console.log(error);
  res.status(500).render("500");
});

app.listen(3000);
