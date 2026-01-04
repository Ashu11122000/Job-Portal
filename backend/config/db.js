// A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
// Imports a file that loads environment variables before anything else runs.
import db from "../config/envConfig.js"; // ensures env loads first

// Imports the mysql2 package, a modern MySQL driver for Node.js.
// It supports Promises, prepared statements, connection pooling, faster queries, and better performance than the old mysql package.
import mysql from "mysql2";

/**
 * In Node.js, pooling primarily refers to database connection pooling, a technique that efficiently manages and reuses a set of open database connections to improve application performance and scalability. 
 * Creates a connection pool, not a single DB connection.
 * Pooling means multiple database connections are created and reused instead of opening a new one for each request.
 */
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,   // If all connections are busy, new requests will wait in a queue instead of throwing an error.
  connectionLimit: 10,   // Maximum number of active DB connections allowed in the pool at the same time.
  queueLimit: 0,   // No limit on how many requests can wait if connections are full && 0 means unlimited queue size.
  enableKeepAlive: true,  // Enables TCP keep-alive to prevent DB connections from closing due to inactivity.
  keepAliveInitialDelay: 0   // Sends the first keep-alive packet immediately (0ms delay).
});


/**
 * Exports the pool wrapped in Promise mode.
 * .promise() allows you to use await pool.query() instead of callback-style queries.
 *
 *  A callback-style query is a programming pattern where a function (the "callback") 
 * is passed as an argument to another function, to be executed by that other 
 * function at a later time, typically when an operation has completed or an event occurs. 
 * 
 */
export default pool.promise();


// A callback function is a function passed as an argument to another function, which then executes the callback at a later time, often after completing its own task.