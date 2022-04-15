function addCsrfToken(req, res, next) {
  //  generate valid token and expose csrfToken to all views thru res.locals 
  res.locals.csrfToken = req.csrfToken();
  next();
}

module.exports = addCsrfToken;