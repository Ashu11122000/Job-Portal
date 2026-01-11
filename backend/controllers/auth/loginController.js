import { loginUser } from "../../services/authService.js";

/**
 * POST /api/auth/login
 * Handles user login
 */
export const login = async (req, res) => {
  try {
    // 1️⃣ Validate input
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Authenticate user
    const result = await loginUser(email, password);

    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3️⃣ Success response
    return res.status(200).json({
      success: true,
      user: result.user,
      token: result.token,
    });

  } catch (error) {
    // 4️⃣ Catch ALL backend errors (DB, JWT, bcrypt, etc.)
    console.error("🔥 LOGIN CONTROLLER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again later.",
    });
  }
};
