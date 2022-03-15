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
  const selectQuery = `SELECT * FROM authors`;

  const [dbAuthors] = await db.query(selectQuery);
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

router.get("/posts/:id", async function (req, res) {
  const whereQuery = `SELECT posts.*, authors.name AS author_name, authors.email AS author_email 
  FROM posts INNER JOIN authors ON posts.author_id = authors.id
  WHERE posts.id = ?`;

  const [posts] = await db.query(whereQuery, [req.params.id]);
  if (!posts || posts.lenght === 0) {
    return res.status(404).render("404");
  }

  const postData = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    humanReadableData: posts[0].date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  res.render("post-detail", { post: postData });
});

module.exports = router;
