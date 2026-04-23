const mysql = require("mysql2");
 
const isProduction = !!process.env.MYSQL_URL;
 
const db = isProduction
  ? mysql.createPool({
      uri: process.env.MYSQL_URL,
      waitForConnections: true,
      connectionLimit: 10,
      ssl: { rejectUnauthorized: false }, //secure connection
    })
  : mysql.createPool({
      host: process.env.MYSQLHOST || "localhost",
      user: process.env.MYSQLUSER || "root",
      password: process.env.MYSQLPASSWORD || "",
      database: process.env.MYSQLDATABASE || "product_dashboard",
      port: process.env.MYSQLPORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
    });
 
module.exports = db;