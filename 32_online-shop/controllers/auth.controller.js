// render page
function getSignup(req, res) {
  res.render('custumer/auth/signup');
}

// handle submission form & crete user
function signup(req,res) {
  
}

function getLogin(req, res) {
  // ...
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup
};
