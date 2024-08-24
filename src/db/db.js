const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "alanm352",
  database: "blog_db",
});

module.exports = pool.promise();
