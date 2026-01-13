import pool from "../../config/db.js";

export const listSessions = async (req, res) => {
  try {
    // ✅ Guard: DB not available
    if (!pool) {
      console.warn("⚠️ DB pool not initialized");
      return res.status(503).json({
        success: false,
        message: "Database not connected",
        sessions: [],
      });
    }

    // ✅ Safe query
    const [rows] = await pool.execute(`
      SELECT 
        id,
        role,
        difficulty,
        created_at
      FROM mock_interviews
      ORDER BY created_at DESC
    `);

    return res.status(200).json({
      success: true,
      sessions: rows,
    });
  } catch (err) {
    console.error("❌ listSessions error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to load interview sessions",
      error: err.message,
      sessions: [],
    });
  }
};
