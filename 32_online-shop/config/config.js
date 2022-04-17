const nodeServer = {
  host: process.env.nodeServer_host,
  port: process.env.PORT || process.env.nodeServer_port
};

const mongoDb = {
  uri: process.env.mongoDb_uriLocalhost || process.env.mongoDb_uriCloud,
  dbName: process.env.mongoDb_databaseName,
  collectionUsers: process.env.mongoDb_collectionUsers,
  collectionSessions: process.env.mongoDb_collectionSessions
};

const sessionConfig = {
  uri: mongoDb.uri,
  dbName: mongoDb.dbName,
  collection: mongoDb.collectionSessions,
  secret: process.env.session_secretKey
};

module.exports = {
  node: nodeServer,
  mongo: mongoDb,
  session: sessionConfig
};