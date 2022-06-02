const Cart = require('../models/cart.model');

function initializeCart(req, res, next) {
	let cart;
	// initialize session.cart as Cart obj
	if (!req.session.cart) {
		cart = new Cart();
	} else {
		// keep session values
		const sessionCart = req.session.cart;
		cart = new Cart(
			sessionCart.items,
			sessionCart.totalQuantity,
			sessionCart.totalPrice
		);
	}

	res.locals.cart = cart;
	next();
}

module.exports = initializeCart;