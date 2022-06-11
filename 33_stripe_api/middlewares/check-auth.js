function checkAuthStatus(req, res, next) {
	const uid = req.session.uid;
	if (!uid) {
		return next();
	}
	// if user is authenticated store to res.locals
	res.locals.uid = uid;
	res.locals.isAuth = true;
	res.locals.isAdmin = req.session.isAdmin;
	next();
}

module.exports = checkAuthStatus;