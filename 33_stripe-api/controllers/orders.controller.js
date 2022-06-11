const { node, stripeApi } = require('../config/config');
const Order = require('../models/order.model');
const User = require('../models/user.model');

const stripePackage = require('stripe');
const stripe = stripePackage(stripeApi.apiKey);

async function getOrders(req, res, next) {
	try {
		const userOrders = await Order.findAllForUser(res.locals.uid);
		res.render('customer/orders/all-orders', { orders: userOrders });
	} catch (error) {
		next(error);
	}
}

async function addOrder(req, res, next){
	const cart = res.locals.cart;

	let userDocument;
	try {
		userDocument = await User.findById(res.locals.uid);
	} catch (error) {
		return next(error);
	}

	const order = new Order(cart, userDocument);
	try {
		await order.save();
	} catch (error) {
		next(error);
		return;
	}

	// clear cart session
	req.session.cart = null;

	// stripe payment
	const session = await stripe.checkout.sessions.create({
		line_items: cart.items.map(
			(item) => {
				return {
					price_data: {
						currency: 'usd',
						product_data: {
							name: item.product.title,
						},
						unit_amount: parseFloat(item.product.price).toFixed(2) * 100,
					},
					quantity: item.quantity,
				};
			}),
		mode: 'payment',
		success_url: `http://${node.host}:${node.port}/orders/success`,
		cancel_url: `http://${node.host}:${node.port}/orders/failure`,
	});

	res.redirect(303, session.url);

	// res.redirect('/orders');
}

function getSuccess(req, res) {
	res.render('customer/orders/success');
}

function getFailure(req, res) {
	res.render('customer/orders/failure');
}

module.exports = {
	getOrders: getOrders,
	addOrder: addOrder,
	getSuccess: getSuccess,
	getFailure: getFailure
};