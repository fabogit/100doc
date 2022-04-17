const User = require('../models/user.model');
const authUtil = require('../util/authentication');

// render page
function getSignup(req, res) {
  res.render('customer/auth/signup');
}

// handle submission form & create user
async function signup(req, res) {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  await user.signup();
  // redirect to login page after user is stored into db
  res.redirect('/login');
}

function getLogin(req, res) {
  res.render('custumer/auth/login');
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  const existingUser = await user.getUserWithSameMail();

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

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login
};
