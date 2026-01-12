import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* -----------------------------------------
   LOGIN USER (UPDATED ONLY)
------------------------------------------ */
export const loginUser = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password required");
    }

    // 1️⃣ Fetch user
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return null; // ❗ handled in controller
    }

    const user = rows[0];

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null; // ❗ handled in controller
    }

    // 3️⃣ Generate JWT
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
    throw error; // bubble to controller
  }
};

/* -----------------------------------------
   JWT TOKEN (UNCHANGED LOGIC, SAFETY CHECK)
------------------------------------------ */
export const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
