/* eslint-disable no-undef */
const nodeServer = {
	host: process.env.nodeServer_host || HOST,
	port: process.env.PORT || process.env.nodeServer_port,
	url: `${process.env.nodeServer_host}:${process.env.nodeServer_port}`
};

const mongoDb = {
	uri: process.env.mongoDb_uriLocalhost || process.env.mongoDb_uriCloud,
	dbName: process.env.mongoDb_databaseName,
	collectionUsers: process.env.mongoDb_collectionUsers,
	collectionProducts: process.env.mongoDb_collectionProducts,
	collectionOrders: process.env.mongoDb_collectionOrders,
	collectionSessions: process.env.mongoDb_collectionSessions
};

const sessionConfig = {
	uri: mongoDb.uri,
	dbName: mongoDb.dbName,
	collection: mongoDb.collectionSessions,
	secret: process.env.session_secretKey
};

const stripeApi = {
	apiKey: process.env.stripe_apiKey
};

module.exports = Object.freeze({
	node: nodeServer,
	mongo: mongoDb,
	session: sessionConfig,
	stripe: stripeApi
});