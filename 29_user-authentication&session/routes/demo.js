const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  // flashing POST /signup session data, to EJS template
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      confirmEmail: "",
      password: "",
    };
  }

  // clear session data
  req.session.inputData = null;

  res.render("signup", { inputData: sessionInputData });
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
    enteredPassword.trim().length < 6 ||
    enteredEmail !== enteredconfirmEmail ||
    !enteredEmail.includes("@")
  ) {
    // if entered data is wrong, store session and reload page
    // and use the saved session data to fill input fields
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
    // user already exists, store in session input data and reload page
    // session data will fill input fields on reload
    req.session.inputData = {
      hasError: true,
      message: "User exists already!",
      email: enteredEmail,
      confirmEmail: enteredconfirmEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect("/signup");
    });
    return;
  }

  // hash&salt entered password
  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };

  // insert user
  await db.getDb().collection("users").insertOne(user);
  res.redirect("/login");
});

router.get("/login", function (req, res) {
  // flashing POST /login session data, to EJS template
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      password: "",
    };
  }

  // clear session data
  req.session.inputData = null;

  res.render("login", { inputData: sessionInputData });
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

  // no user found
  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "Could not log you in - check your credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect("/login");
    });
    return;
  }

  // compare inserted password to stored password
  const passwordsAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  // wrong password
  if (!passwordsAreEqual) {
    req.session.inputData = {
      hasError: true,
      message: "Could not log you in - check your credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect("/login");
    });
    return;
  }

  // adding user data to the session
  req.session.user = {
    id: existingUser._id,
    email: existingUser.email,
  };
  req.session.isAuthenticated = true;
  // redirect user after session data is stored
  req.session.save(function () {
    res.redirect("/profile");
  });
});

router.get("/admin", async function (req, res) {
  // checking if user is authenticated
  // if (!req.session.isAuthenticated) {
  if (!res.locals.isAuth) {
    return res.status(401).render("401");
  }
  /* 
  const user = await db
    .getDb()
    .collection("users")
    .findOne({ _id: req.session.user.id });
 */
  // check for admin role
  // if (!user || !user.isAdmin) {
  if (!res.locals.isAdmin) {
    return res.status(403).render("403");
  }

  res.render("admin");
});

router.get("/profile", function (req, res) {
  // checking if user is authenticated
  if (!res.locals.isAuth) {
    return res.status(401).render("401");
  }
  res.render("profile");
});

router.post("/logout", function (req, res) {
  // void session
  req.session.user = null;
  req.session.isAuthenticated = false;
  // no need to wait db, / dont rely on session
  res.redirect("/");
});

module.exports = router;
