import pool from "../../config/db.js";

export const listSessions = async (req, res) => {
  try {
    // ✅ DB not connected (Railway / env issue)
    if (!pool) {
      return res.status(503).json({
        success: false,
        message: "Database connection not available",
        sessions: [],
      });
    }

    // ✅ Query DB safely
    const [rows] = await pool.execute(
      `
      SELECT 
        id,
        role,
        difficulty,
        created_at
      FROM mock_interviews
      ORDER BY created_at DESC
      `
    );

    return res.json({
      success: true,
      sessions: rows,
    });
  } catch (err) {
    console.error("❌ listSessions error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch mock interview sessions",
      sessions: [],
    });
  }
};
