const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const joinQuery = `SELECT posts.*, authors.name AS author_name FROM posts
   INNER JOIN authors ON posts.author_id = authors.id`;
  const [postsData] = await db.query(joinQuery);
  res.render("posts-list", { posts: postsData });
});

router.get("/new-post", async function (req, res) {
  const [dbAuthors] = await db.query("SELECT * FROM authors");
  res.render("create-post", { authors: dbAuthors });
});

router.post("/posts", async function (req, res) {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];
  const insertQuery = `INSERT INTO posts (
    title, summary, body, author_id) VALUES (?)`;
  await db.query(insertQuery, [data]);
  res.redirect("/posts");
});

module.exports = router;
