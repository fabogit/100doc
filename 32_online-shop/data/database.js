const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const host = '127.0.0.1';
const port = '27017';
const dbName = 'online-shop';
const userCollectionName = 'users';
let database;

async function mongoClientConnect(host, port, dbName) {
  try {
    // connect to the mongodb server
    const uri = `mongodb://${host}:${port}`;
    const client = await MongoClient.connect(uri);
    // connect to the database
    database = client.db(dbName);
    console.log(`\u2705 MongoDB \u2192 ${uri}/${dbName}`);
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
  host: host,
  port: port,
  dbName: dbName,
  userCollection: userCollectionName,
  connectToDb: mongoClientConnect,
  getDb: checkDbConnection
};
