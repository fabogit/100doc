const User = require('../models/user.model');
const authUtil = require('../util/authentication');
const validation = require('../util/validation');

// render page
function getSignup(req, res) {
  res.render('customer/auth/signup');
}

// handle submission form & create user
async function signup(req, res, next) {
  // validate data
  if (!validation.userDetailsAreValid(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  ) || !validation.emailIsConfirmed(req.body.email, req.body['confirm-email'])
  ) {
    res.redirect('/signup');
  }
  // data is valid create new User
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    // already exists, redirect to signup (or login)
    const existsAlready = await user.existsAlready();
    if (existsAlready) {
      res.redirect('/signup');
      return;
    }
    // create user
    await user.signup();
  } catch (error) {
    // pass error to default error handler
    next(error);
    return;
  }
  // redirect to login page after user is stored into db
  res.redirect('/login');
}

function getLogin(req, res) {
  res.render('customer/auth/login');
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  // allow scope inside the try/catch block
  let existingUser;
  try {
    existingUser = await user.getUserWithSameMail();
  } catch (error) {
    // pass error to default error handler
    next(error);
    return;
  }

  if (!existingUser) {
    res.redirect('/login');
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);

  if (!passwordIsCorrect) {
    res.redirect('/login');
    return;
  }

  // user is valid, set session
  authUtil.createUserSession(req, existingUser, () => {
    res.redirect('/');
  });
}

function logout(req, res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect('/login');
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout
};
