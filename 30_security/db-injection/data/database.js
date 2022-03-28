const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  database: "security",
  user: "root",
  password: "mysql",
  // multipleStatements: true is not a default value,
  // allow more than 1 SQL statament at once to be executred
  // multipleStatements: true,
});

module.exports = pool;
