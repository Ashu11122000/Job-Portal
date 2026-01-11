import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQL_ROOT_PASSWORD || process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 15000,
});

// ✅ NON-BLOCKING health check (does NOT crash app)
pool
  .query("SELECT 1")
  .then(() => console.log("✅ MySQL pool ready"))
  .catch((err) => console.error("❌ MySQL pool error:", err.message));

export default pool;
