import { registerUser } from "../../services/authService.js";

/**
 * Controller: Register User
 * Route: POST /api/auth/register
 */
export const register = async (req, res) => {
  try {
    console.log("📥 Register request body:", req.body);

    const { name, email, password, role } = req.body;

    // ✅ 1. Basic validation (VERY IMPORTANT)
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // ✅ 2. Call service (DB logic lives here)
    const user = await registerUser({ name, email, password, role });

    // ❌ Safety check (prevents silent failure)
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User registration failed",
      });
    }

    // ✅ 3. Send response (MUST always return)
    return res.status(201).json({
      success: true,
      user,
      token: "temp-test-token", // replace later with JWT
    });

  } catch (error) {
    // ✅ 4. THIS PREVENTS REQUEST TIMEOUT
    console.error("❌ Register Controller Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
