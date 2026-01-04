import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM test_connection");
    res.json({
      success: true,
      data: rows
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
