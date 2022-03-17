const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const host =  "127.0.0.1";
const port = "27017";
const mongoUrl = `mongodb://${host}:${port}`;
const mongoDbDatabaseName = "blog";

let database;

async function mongoClientConnect() {
  // connect to the mongo server
  const client = await MongoClient.connect(mongoUrl);
  // connect to the database
  database = client.db(mongoDbDatabaseName);
  console.log("MongoDB: [OK]"); 
}

// check for db connection
function getDb() {
  if (!database) {
    throw { message: "Database connection not established!" };
  }
  console.log(`Connected successfully to database: ${database.databaseName}`)
  return database;
}

module.exports = {
  connectToMongoDB: mongoClientConnect,
  getDb: getDb,
};
