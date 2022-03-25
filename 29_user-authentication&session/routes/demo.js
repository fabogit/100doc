const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  // flashing session data, to EJS template
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      confirmEmail: "",
      password: " ",
    };
  }

  // clear session data
  req.session.sessionInputData = null;

  res.render("signup", { inputData: sessionInputData });
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/signup", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredconfirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;

  // validate data
  if (
    !enteredEmail ||
    !enteredconfirmEmail ||
    !enteredPassword ||
    enteredPassword.trim() < 6 ||
    enteredEmail !== enteredconfirmEmail ||
    !enteredEmail.includes("@")
  ) {
    // store entered data
    req.session.inputData = {
      hasError: true,
      message: "Invalid input - please check your data!",
      email: enteredEmail,
      confirmEmail: enteredconfirmEmail,
      password: enteredPassword,
    };

    req.session.save(function () {
      res.redirect("/signup");
    });
    // return after saving session
    return;
  }

  // check if email already exist
  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (existingUser) {
    console.log("User exists already");
    return res.redirect("/signup");
  }

  // hash&salt entered password
  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };

  await db.getDb().collection("users").insertOne(user);
  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  // get inserted email data
  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (!existingUser) {
    console.log("Wrong email!");
    return res.redirect("/login");
  }

  // compare inserted password to stored password
  const passwordsAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  if (!passwordsAreEqual) {
    console.log("Wrong password!");
    return res.redirect("/login");
  }

  // adding user data to the session
  req.session.user = {
    id: existingUser._id,
    email: existingUser.email,
  };
  req.session.isAuthenticated = true;
  // redirect user after session data is stored
  req.session.save(function () {
    res.redirect("/admin");
  });
});

router.get("/admin", function (req, res) {
  // checking if user is authenticated
  // !req.session.user also works
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }
  res.render("admin");
});

router.post("/logout", function (req, res) {
  // void session
  req.session.user = null;
  req.session.isAuthenticated = false;
  // no need to wait db, / dont rely on session
  res.redirect("/");
});

module.exports = router;
