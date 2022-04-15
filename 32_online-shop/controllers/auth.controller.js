const { render } = require("express/lib/response");

function getSignup(req, res) {
  res.render('custumer/auth/signup');
}

function getLogin(req, res) {
  // ...
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin
};
