const path = require('path');

require('dotenv').config();
const express = require('express');
const expressSession = require('express-session');
const csrf = require('csurf');
var logger = require('morgan');

const { node, mongo } = require('./config/config');
const createSessionConfig = require('./config/session');
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const authRoutes = require('./routes/auth.routes');
const baseRoutes = require('./routes/base.routes');
const productsRoutes = require('./routes/products.routes');

const app = express();

app.use(logger('dev'));
// EJS & views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// enable static files
app.use(express.static('public'));
// allow to extract request data from incoming form submissions
app.use(express.urlencoded({ extended: false }));
// enable session
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));
app.use(checkAuthStatusMiddleware);
// enable csurf after session,
// generate csrf token and check for it on all incoming requests (not for GET)
app.use(csrf());
// set token to res.locals.csrfToken
app.use(addCsrfTokenMiddleware);

// routes
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);

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
        ` NodeJS  →  @${nodeHost}:${server.address().port}`
      );
    });
  } catch (error) {
    console.log(` ERROR → ${error}`);
  }
})();
