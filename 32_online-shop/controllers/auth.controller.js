const User = require('../models/user.model');
const authUtil = require('../util/authentication');
const validation = require('../util/validation');
const sessionFlash = require('../util/session-flash');

// render signup page
function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    // set default values when session data is empty
    sessionData = {
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      fullname: '',
      street: '',
      postal: '',
      city: ''
    };
  }
  res.render('customer/auth/signup', { inputData: sessionData });
}

// handle submission form & create user
async function signup(req, res, next) {
  // const { _csrf, ...enteredData } = req.body;
  
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body['confirm-email'],
    password: req.body.password,
    confirmPassword: req.body['confirm-password'],
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city
  };
  console.log(enteredData);
  
  // validate data
  if (!validation.userDetailsAreValid(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  ) || !validation.valueIsConfirmed(req.body.email, req.body['confirm-email'])
    || !validation.valueIsConfirmed(req.body.password, req.body['confirm-password'])
  ) {
    // invalid data, store data to session and redirect
    sessionFlash.flashDataToSession(
      req,
      // data
      {
        errorMessage: 'Please check your input fields. Password must be at least 6 charachters long, postal code must be 5 charachters long',
        ...enteredData
      },
      // callback action
      () => {
        res.redirect('/signup');
      }
    );
    return;
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
    // already exists, store to session and redirect to signup
    const existsAlready = await user.existsAlready();
    if (existsAlready) {
      sessionFlash.flashDataToSession(
        req,
        // data
        {
          errorMessage: 'E-mail already in use, user exist already, try logging in instead!',
          ...enteredData
        },
        // callback action
        () => {
          res.redirect('/signup');
        }
      );
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
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    // set default values when session data is empty
    sessionData = {
      email: '',
      password: '',
    };
  }
  res.render('customer/auth/login', { inputData: sessionData });
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

  const sessionErrorData = {
    errorMessage: 'Invalid credentials - please check inserted email and password',
    email: user.email,
    password: user.password
  };

  if (!existingUser) {
    sessionFlash.flashDataToSession(req, sessionErrorData, () => {
      res.redirect('/login');
    });
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, sessionErrorData, () => {
      res.redirect('/login');
    });
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
