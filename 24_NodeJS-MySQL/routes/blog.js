const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/post");
});

router.get("/post", function (req, res) {
  res.render("posts-list");
});

router.get("/new-post", function (req, res) {
  res.render("create-post");
});

module.exports = router;
