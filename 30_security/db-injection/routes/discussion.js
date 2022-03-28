const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/discussion");
});

router.get("/discussion", async function (req, res) {
  let filter = "";

  if (req.query.author) {
    // SQL inject into req.query.author =>
    // username"; DROP TABLE comments; SELECT * FROM comments WHERE author = "username
    // filter = `WHERE author = "${req.query.author}"`; // this will run SQL code if present
    //  to escape user input in query use the built in mysql2 method [?]
    filter = `WHERE author = ?`;
  }

  const query = `SELECT * FROM comments ${filter}`;

  console.log(query);

  // set the [? here]
  const [comments] = await db.query(query, [req.query.author]);

  res.render("discussion", { comments: comments });
});

router.post("/discussion/comment", async function (req, res) {
  await db.query("INSERT INTO comments (author, text) VALUES (?)", [
    [req.body.name, req.body.comment],
  ]);

  res.redirect("/discussion");
});

module.exports = router;
