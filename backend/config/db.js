import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD, // ✅ THIS WAS MISSING
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT),
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 10000,
});

export default pool;
