const Cart = require('../models/cart.model');

function initializeCart(req, res, next) {
	let cart;
	// initialize session.cart as Cart obj
	if (!req.session.cart) {
		cart = new Cart();
	} else {
		cart = new Cart(req.session.cart.items);
	}

	res.locals.cart = cart;
	next();
}

module.exports = initializeCart;