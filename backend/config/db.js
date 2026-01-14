import mysql from "mysql2/promise";

let pool = null;

/**
 * ✅ SAFETY CHECK
 * If MySQL env vars are missing,
 * do NOT attempt DB connection.
 */
const hasDbEnv =
  process.env.MYSQLHOST &&
  process.env.MYSQLUSER &&
  (process.env.MYSQL_ROOT_PASSWORD || process.env.MYSQLPASSWORD) &&
  (process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE);

if (!hasDbEnv) {
  console.warn("⚠️ MySQL env vars missing → DB connection skipped");
} else {
  try {
    pool = mysql.createPool({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password:
        process.env.MYSQL_ROOT_PASSWORD || process.env.MYSQLPASSWORD,
      database:
        process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE,
      port: Number(process.env.MYSQLPORT || 3306),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 15000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });

    // ✅ NON-BLOCKING health check
    pool
      .query("SELECT 1")
      .then(() => console.log("✅ MySQL pool ready"))
      .catch((err) =>
        console.error("❌ MySQL health check failed:", err.message)
      );
  } catch (err) {
    console.error("❌ Failed to create MySQL pool:", err.message);
    pool = null;
  }
}

/**
 * ✅ SAFETY WRAPPER
 * Prevents app crash when pool is null
 */
const safePool = {
  query: async (...args) => {
    if (!pool) {
      throw new Error(
        "Database not initialized. Check MySQL environment variables."
      );
    }
    return pool.query(...args);
  },
  execute: async (...args) => {
    if (!pool) {
      throw new Error(
        "Database not initialized. Check MySQL environment variables."
      );
    }
    return pool.execute(...args);
  },
};

export default safePool;
