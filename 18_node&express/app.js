const express = require("express");

const app = express();
// localhost:3000/current-time
app.get("/current-time", function (req, res) {
  res.send(`<h1>Current time is ${new Date().toISOString()}</h1>`);
});
// localhost:3000
app.get("/", function (req, res) {
  res.send("<h1>Hello Worls!}</h1>");
});

app.listen(3000);
