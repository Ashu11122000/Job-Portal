import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* -----------------------------------------
   REGISTER USER
------------------------------------------ */
export const registerUser = async ({ name, email, password, role }) => {
  try {
    // ✅ Safety validation
    if (!name || !email || !password) {
      throw new Error("Missing required registration fields");
    }

    // ✅ Check if user already exists
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      throw new Error("User already exists with this email");
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert user
    const [result] = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, role || "candidate"]
    );

    // ✅ Return clean object (NO password)
    return {
      id: result.insertId,
      name,
      email,
      role: role || "candidate",
    };

  } catch (error) {
    console.error("❌ registerUser() error:", error.message);
    throw error; // IMPORTANT: bubble error to controller
  }
};

/* -----------------------------------------
   LOGIN USER
------------------------------------------ */
export const loginUser = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password required");
    }

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      throw new Error("Invalid email or password");
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(user);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };

  } catch (error) {
    console.error("❌ loginUser() error:", error.message);
    throw error;
  }
};

/* -----------------------------------------
   JWT TOKEN
------------------------------------------ */
export const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
