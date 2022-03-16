const { get } = require("express/lib/response");
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const host = "127.0.0.1";
const port = "27017";
const db = "blog";
const mongoUrl = `mongodb://${host}:${port}`;

let database;

async function connect() {
  const client = await MongoClient.connect(mongoUrl);
  database = client.db(db);
}

function getDb() {
  if (!database) {
    throw { message: "Database connection not established!" };
  }
  return database;
}

module.exports = {
  connectToDatabase: connect,
  getDb: getDb,
};
