const path = require('path');

require('dotenv').config();
const express = require('express');
const expressSession = require('express-session');
const csrf = require('csurf');
const logger = require('morgan');

const { node, mongo } = require('./config/config');
const createSessionConfig = require('./config/session');
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutesMiddleware = require('./middlewares/protect-routes');
const cartMiddleware = require('./middlewares/cart');
const updateCartPricesMiddleware = require('./middlewares/update-cart-prices');
const authRoutes = require('./routes/auth.routes');
const baseRoutes = require('./routes/base.routes');
const productsRoutes = require('./routes/products.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');
const ordersRoutes = require('./routes/orders.routes');

const app = express();

app.use(logger('dev'));
// EJS & views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// enable static files
app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));
// allow to extract request data from incoming form submissions
app.use(express.urlencoded({ extended: false }));
// allow to parse JSON from ajax request
app.use(express.json());
// enable session
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));
app.use(checkAuthStatusMiddleware);
// enable csurf after session,
// generate csrf token and check for it on all incoming requests (not for GET)
app.use(csrf());
// set token to res.locals.csrfToken
app.use(addCsrfTokenMiddleware);
// cart session
app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);

// routes
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', protectRoutesMiddleware, ordersRoutes);
app.use('/admin', protectRoutesMiddleware, adminRoutes);
// invalid route
app.use(notFoundMiddleware);

// error handling
app.use(errorHandlerMiddleware);

// Start an IIFE to use `await` at the top level
(async () => {
	try {
		// connect db & run server
		await db.connectToDb(mongo.uri);
		const nodePort = node.port;
		const nodeHost = node.host;
		const server = app.listen(nodePort, nodeHost, () => {
			console.log(
				` NodeJS  →  @${nodeHost}:${server.address().port}`
			);
		});
	} catch (error) {
		console.log(` ERROR →  ${error}`);
	}
})();