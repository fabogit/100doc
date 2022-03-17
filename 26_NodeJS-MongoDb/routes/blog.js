const express = require("express");
const mongodb = require("mongodb");

const db = require("../data/database");
const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", function (req, res) {
  res.render("posts-list");
});

router.post("/posts", async function (req, res) {
  const authorId = new ObjectId(req.body.author);
  const authorDocument = await db
    .getDb()
    .collection("authors")
    .findOne({ _id: authorId });

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: authorDocument.name,
      email: authorDocument.email,
    },
  };

  const result = await db.getDb().collection("posts").insertOne(newPost);
  res.redirect("/posts");
});

router.get("/new-post", async function (req, res) {
  const authorsArray = await db.getDb().collection("authors").find().toArray();
  res.render("create-post", { authors: authorsArray });
});

module.exports = router;
