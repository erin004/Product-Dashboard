const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "product_dashboard",
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: process.env.MYSQLHOST ? { rejectUnauthorized: false } : false,
});

module.exports = db;