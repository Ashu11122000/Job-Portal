import pool from "../../config/db.js";

export const createJob = async (req, res) => {
  try {
    const { title, company, location, salary, description } = req.body;

    const [result] = await pool.query(
      "INSERT INTO jobs (title, company, location, salary, description) VALUES (?, ?, ?, ?, ?)",
      [title, company, location, salary, description]
    );

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: { id: result.insertId, title, company, location, salary, description }
    });
  } catch (err) {
    console.error("❌ Error in createJob:", err);
    res.status(500).json({ success: false, message: "Failed to create job" });
  }
};
