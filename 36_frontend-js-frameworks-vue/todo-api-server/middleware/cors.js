function enableCors(req, res, next) {
	// setting headers to allow cors
	// URL from where allow acces
	res.setHeader('Access-Control-Allow-Origin', '*');
	// allow http methods (OPTIONS header for client AJAX)
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
	// which headers added on the client request are allowed
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
}

module.exports = enableCors;