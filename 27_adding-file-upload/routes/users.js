const express = require("express");
const multer = require("multer");

const db = require("../data/database");

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storageConfig });
const router = express.Router();

router.get("/", async function (req, res) {
  const query = {};
  const options = {};
  const usersArray = await db
    .getDb()
    .collection("users")
    .find(query, options)
    .toArray();

  res.render("profiles", { users: usersArray });
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

router.post(
  "/profiles",
  upload.single("image-upload"),
  async function (req, res) {
    const uploadedImageFile = req.file;
    const userData = req.body;

    await db.getDb().collection("users").insertOne({
      name: userData.username,
      imagePath: uploadedImageFile.path,
    });

    res.redirect("/");
  }
);

module.exports = router;
