import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config(); // ✔ ENSURES ENV IS LOADED INSIDE THIS FILE TOO

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

console.log("🧠 MySQL ENV Loaded →", {
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  MYSQL_PORT: process.env.MYSQL_PORT
});

export default pool.promise();
