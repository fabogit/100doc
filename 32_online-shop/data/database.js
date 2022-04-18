const mongodb = require('mongodb');

const { mongo } = require('../config/config');

const MongoClient = mongodb.MongoClient;

let database;
const databaseName = mongo.dbName;

async function mongoClientConnect(uri) {
  try {
    // connect to the mongodb server
    const client = await MongoClient.connect(uri);
    // connect to the database
    database = client.db(databaseName);
    console.log(` MongoDB →  ${uri}/${databaseName}`);
  } catch (error) {
    console.log(` MongoDB → ${error.message}`);
  }
  // no return, yeld a promise
}

function checkDbConnection() {
  if (!database) {
    throw new Error(' No database connection');
  }
  console.log(` Connected to database: ${database.databaseName}`);
  return database;
}

module.exports = {
  connectToDb: mongoClientConnect,
  getDb: checkDbConnection
};
