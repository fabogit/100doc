const express = require("express");
const mongodb = require("mongodb");

const db = require("../data/database");
const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const query = {};
  const options = { projection: { title: 1, summary: 1, "author.name": 1 } };
  const postsArray = await db
    .getDb()
    .collection("posts")
    .find(query, options)
    .toArray();
  res.render("posts-list", { posts: postsArray });
});

router.post("/posts", async function (req, res) {
  //  query using submitted <form> data in req.body
  const authorId = new ObjectId(req.body.author);
  const query = { _id: authorId };
  const options = {};
  const authorDocument = await db
    .getDb()
    .collection("authors")
    .findOne(query, options);

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
  // insert <form> payload)
  const result = await db.getDb().collection("posts").insertOne(newPost);
  res.redirect("/posts");
});

router.get("/posts/:id", async function (req, res) {
  const postId = req.params.id;
  const query = { _id: new ObjectId(postId) };
  const options = { projection: { summary: 0 } };
  const postData = await db.getDb().collection("posts").findOne(query, options);

  if (!postData) {
    return res.status(404).render("404");
  }

  postData.humanReadableDate = postData.date.toLocaleDateString("en-Us", {
    wekkday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  postData.date = postData.date.toISOString();

  // pass data to f/end
  res.render("post-detail", { post: postData });
});

router.get("/posts/:id/edit", async function (req, res) {
  const postId = req.params.id;
  const query = { _id: new ObjectId(postId) };
  const options = { projection: { title: 1, summary: 1, body: 1 } };
  const postData = await db.getDb().collection("posts").findOne(query, options);

  if (!postData) {
    return res.status(404).render("404");
  }
  // pass list to f/end
  res.render("update-post", { post: postData });
});

router.post("/posts/:id/edit", async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const filter = { _id: postId };
  const update = {
    $set: {
      title: req.body.title,
      summary: req.body.summary,
      body: req.body.content,
      // update Date
      // date: new Date()
    },
  };
  const postData = await db
    .getDb()
    .collection("posts")
    .updateOne(filter, update);

  res.redirect("/posts");
});

router.get("/new-post", async function (req, res) {
  const query = {};
  const options = {};
  const authorsArray = await db
    .getDb()
    .collection("authors")
    .find(query, options)
    .toArray();
  // pass list to f/end
  res.render("create-post", { authors: authorsArray });
});

module.exports = router;
