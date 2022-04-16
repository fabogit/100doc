const mongodb = require('mongodb');

const cnf = require('../config/config')

const MongoClient = mongodb.MongoClient;

let database;
const databaseName = cnf.mongo.dbName

async function mongoClientConnect(uri) {
  try {
    // connect to the mongodb server
    const client = await MongoClient.connect(uri);
    // connect to the database
    database = client.db(databaseName);
    console.log(`\u2705 MongoDB \u2192 ${uri}/${databaseName}`);
  } catch (error) {
    console.log(`\u274C MongoDB \u2192 ${error.message}`);
  }
  // no return, yeld a promise
}

function checkDbConnection() {
  if (!database) {
    throw new Error('\u274C No database connection');
  }
  console.log(`\u2705 Connected to database: ${database.databaseName}`);
  return database;
}

module.exports = {
  connectToDb: mongoClientConnect,
  getDb: checkDbConnection
};
