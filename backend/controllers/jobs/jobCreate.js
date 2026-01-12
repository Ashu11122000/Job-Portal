import pool from "../../config/db.js";

export const createJob = async (req, res) => {
  try {
    const { title, description, salary, location, company_id } = req.body;

    // Basic validation
    if (!title || !company_id) {
      return res.status(400).json({
        success: false,
        message: "title and company_id are required",
      });
    }

    const [result] = await pool.query(
      `
      INSERT INTO jobs (title, description, salary, location, company_id)
      VALUES (?, ?, ?, ?, ?)
      `,
      [title, description, salary, location, company_id]
    );

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: {
        id: result.insertId,
        title,
        description,
        salary,
        location,
        company_id,
      },
    });
  } catch (err) {
    console.error("❌ Error in createJob:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create job",
      error: err.message,
    });
  }
};
