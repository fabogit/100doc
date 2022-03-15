const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/post");
});

router.get("/post", function (req, res) {
  res.render("posts-list");
});

router.get("/new-post", async function (req, res) {
  const [dbAuthors] = await db.query("SELECT * FROM authors");
  res.render("create-post", { authors: dbAuthors });
});

module.exports = router;
