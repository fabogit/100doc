function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  req.session.save(action);
}

function destroyUserAuthSession(req) {
  // set no value when user logout
  req.session.uid = null;
  // no need to req.session.save() user is loggin out...
}

module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession
};