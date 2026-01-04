/**
 * Imports the MySQL connection pool you created earlier because db.js exported pool.promise(), this pool allows async DB queries using await.
 * Imports bcrypt library for password hashing & verification.
 * bcrypt.hash() → converts plain password into secure encrypted string.
 * bcrypt.compare() → checks plain password vs hashed password.
 * Imports JWT library to generate authentication tokens using jwt.sign().
 */

import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// exports an async function named registerUser.It accepts an object as argument, and destructures it directly, when called like: registerUser({ name, email, password, role })
export const registerUser = async ({ name, email, password, role }) => {
  
  // Takes the plain password and converts it into a hashed string & await ensures hashing completes before moving ahead.
  const hashedPassword = await bcrypt.hash(password, 10);

  // Runs a MySQL query using the connection pool & [result] means we only care about the query result metadata, not returned rows
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role]
  );

  return { id: result.insertId, name, email, role };
};

export const loginUser = async (email, password) => {
  /**
   * Fetches user record where email matches.
   * Result is stored in rows array.
   * ? prevents SQL injection.
   * [email] replaces the placeholder.
   */
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

  // Gets the first matched user from results.
  const user = rows[0];

  if (!user) return null;

  // Compares plain password entered by user with hashed password stored in DB.
  // Returns true if match, else false.
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  // Creates a JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },

    // Uses secret key from .env to sign the token.
    process.env.JWT_SECRET,

    // Token will expire after 7 days.
    { expiresIn: "7d" }
  );

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token
  };
};

// Exports a normal (non-async) function.
// Takes user object as input.
export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
