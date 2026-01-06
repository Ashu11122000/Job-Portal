import pool from "../config/db.js";

// GET ALL JOBS
export const getJobs = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM jobs");
    return rows;
  } catch (err) {
    console.error("Database Error in getJobs:", err.message);
    throw new Error("Failed to fetch jobs from database");
  }
};

// GET SINGLE JOB BY ID
export const getJob = async (id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM jobs WHERE id=?", [id]);
    return rows[0] || null;
  } catch (err) {
    console.error("Database Error in getJob:", err.message);
    throw new Error("Failed to fetch job from database");
  }
};

// CREATE A NEW JOB
export const createJob = async (job) => {
  try {
    const { title, company, location, salary, description } = job;

    if (!title || !company || !location || !salary || !description) {
      throw new Error("All job fields are required");
    }

    const [result] = await pool.query(
      "INSERT INTO jobs (title, company, location, salary, description) VALUES (?,?,?,?,?)",
      [title, company, location, salary, description]
    );

    return {
      id: result.insertId,
      title,
      company,
      location,
      salary,
      description,
    };
  } catch (err) {
    console.error("Database Error in createJob:", err.message);
    throw new Error(err.message || "Failed to create job in database");
  }
};

// UPDATE JOB
export const updateJob = async (id, job) => {
  try {
    const { title, company, location, salary, description } = job;

    const [result] = await pool.query(
      "UPDATE jobs SET title=?, company=?, location=?, salary=?, description=? WHERE id=?",
      [title, company, location, salary, description, id]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return { id: Number(id), title, company, location, salary, description };
  } catch (err) {
    console.error("Database Error in updateJob:", err.message);
    throw new Error("Failed to update job in database");
  }
};

// DELETE JOB
export const deleteJob = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM jobs WHERE id=?", [id]);

    if (result.affectedRows === 0) {
      return null;
    }

    return Number(id);
  } catch (err) {
    console.error("Database Error in deleteJob:", err.message);
    throw new Error("Failed to delete job from database");
  }
};


// Assign Job (Create)
export const insertJob = async (jobData) => {
  const sql = `INSERT INTO jobs (title, company, location, salary, description, company_id)
               VALUES (?, ?, ?, ?, ?, ?)`;

  const { title, company, location, salary, description, company_id } = jobData;

  const [result] = await pool.query(sql, [
    title,
    company,
    location,
    salary,
    description,
    company_id || null,
  ]);

  return result;
};

// List Jobs by Company
export const fetchJobsByCompany = async (companyId) => {
  const sql = `SELECT * FROM jobs WHERE company_id = ? ORDER BY created_at DESC`;
  const [rows] = await pool.query(sql, [companyId]);
  return rows;
};