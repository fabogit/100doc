const path = require("path");

const express = require("express");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");

const db = require("./data/database");
const demoRoutes = require("./routes/demo");

const app = express();

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static files location
app.use(express.static("public"));
// parsing for incoming web requests
app.use(express.urlencoded({ extended: false }));

// config session store
const MongoDBStore = mongodbStore(session);
const sessionStore = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017",
  databaseName: "auth-demo",
  collection: "sessions",
});
// generate session for every request
app.use(
  session({
    secret: "super-secret",
    // update only if session data change
    resave: false,
    // store session only if there is data
    saveUninitialized: false,
    // where to store the session
    store: sessionStore,
  })
);

app.use(demoRoutes);

app.use(function (error, req, res, next) {
  res.render("500");
});

db.connectToMongoDB().then(function () {
  const port = 3000;
  app.listen(port, () => {
    console.log(`\u2705 NodeJS\nRunning on port: ${port}`);
  });
});
