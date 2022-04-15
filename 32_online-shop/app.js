const path = require('path');

const express = require('express');
const csrf = require('csurf');

const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const authRoutes = require('./routes/auth.routes');

const app = express();

// EJS & views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// enable static files
app.use(express.static('public'));
// allow to extract request data from incoming form submissions
app.use(express.urlencoded({ extended: false }));
// enable csurf, generate csrf token and check all requests (not GET) for it
app.use(csrf());
// set token to res.locals.csrfToken
app.use(addCsrfTokenMiddleware);

// routes
app.use(authRoutes);

// error handling mdlwr
app.use(errorHandlerMiddleware);

// Start an IIFE to use `await` at the top level
(async () => {
  try {
    // connect db & run server
    await db.connectToDb(db.host, db.port, db.dbName);
    const port = 3000;
    app.listen(port, () => {
      console.log(`\u2705 NodeJS  \u2192 Running on port: ${port}`);
    });
  } catch (error) {
    console.log(`\u274C ERROR \u2192 ${error}`);
  }
})();
