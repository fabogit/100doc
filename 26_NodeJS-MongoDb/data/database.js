const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const host = "127.0.0.1";
const port = "27017";
const mongoUrl = `mongodb://${host}:${port}`;
const dbName = "blog";

let database;

async function connectMC() {
  // connect to the mongo server
  const client = await MongoClient.connect(mongoUrl);
  console.log("MongoDB: [OK]");
  // connect to the database
  database = client.db(dbName);
}

function getDb() {
  if (!database) {
    throw { message: "Database connection not established!" };
  }
  console.log(`Db name: ${dbName}`)
  return database;
}

module.exports = {
  connectToMongoDB: connectMC,
  getDb: getDb,
};
