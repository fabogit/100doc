const User = require('../models/user.model');

// render page
function getSignup(req, res) {
  res.render('custumer/auth/signup');
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

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup
};
