const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

// localhost:3000/current-time
app.get("/current-time", function (req, res) {
  res.send(`<h1>Current time is ${new Date().toISOString()}</h1>`);
});
// localhost:3000
app.get("/", function (req, res) {
  const htmlForm = `
                    <form action="/store-user" method="POST">
                      <label>Your Name</label>
                      <input type="text" name="username">
                        <button>Submit</button>
                      </input>
                    </form>`;
  res.send(htmlForm);
});

app.post("/store-user", function (req, res) {
  //
  const userName = req.body.username;
  console.log(userName);
  res.send(`<h1>User ${userName} registered`);
});

app.listen(3000);
