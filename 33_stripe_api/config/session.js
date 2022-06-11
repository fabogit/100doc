const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

const { session } = require('./config');

// create session
function createSessionStore() {
	const MongoDBStore = mongoDbStore(expressSession);

	const store = new MongoDBStore({
		uri: session.uri,
		databaseName: session.dbName,
		collection: session.collection
	});
	return store;
}

function createSessionConfig() {
	return {
		secret: session.secret,
		// save only if session changes
		resave: false,
		// save if some value was set
		saveUninitialized: false,
		store: createSessionStore(),
		// if not set clear session on browser close 
		cookie: {
			// 1 day
			maxAge: 1 * 24 * 60 * 60 * 1000
		}
	};
}

module.exports = createSessionConfig;