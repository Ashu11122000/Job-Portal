import pool from "../config/db.js";

// Existing kept
export const insertCompany = async (companyData) => {
  const sql = `
    INSERT INTO companies 
    (name, location, industry, employees, website, description, logo, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const {
    name,
    location,
    industry,
    employees,
    website,
    description,
    logo,
    created_by,
  } = companyData;

  const [result] = await pool.query(sql, [
    name,
    location,
    industry || null,
    employees || null,
    website || null,
    description || null,
    logo || "",
    created_by || null,
  ]);

  const [rows] = await pool.query(
    `SELECT * FROM companies WHERE id = ?`,
    [result.insertId]
  );

  return rows[0];
};


// Existing kept
export const fetchCompanies = async () => {
  const sql = `SELECT * FROM companies ORDER BY created_at DESC`;
  const [rows] = await pool.query(sql);
  return rows;
};

// Existing kept
export const fetchCompanyById = async (id) => {
  const sql = `SELECT * FROM companies WHERE id = ?`;
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
};

// Existing kept
export const updateCompanyDB = async (id, data) => {
  const sql = `UPDATE companies SET name=?, location=?, industry=?, employees=?, website=?, description=?, logo=? 
               WHERE id=?`;

  const { name, location, industry, employees, website, description, logo } = data;

  const [result] = await pool.query(sql, [
    name,
    location,
    industry,
    employees,
    website,
    description,
    logo || "",
    id,
  ]);

  return result;
};

// Existing kept
export const deleteAllCompaniesDB = async () => {
  const sql = `DELETE FROM companies`;
  const [result] = await pool.query(sql);
  return result;
};

// Existing kept
export const deleteCompanyByIdDB = async (id) => {
  const sql = `DELETE FROM companies WHERE id=?`;
  const [result] = await pool.query(sql, [id]);
  return result;
};

// ===================== 🏁 PHASE 3 STARTS HERE (NEWLY ADDED, ABOVE KEPT INTACT) =====================

// Existing kept
export const insertJobByCompany = async (jobData) => {
  const sql = `INSERT INTO jobs (title, company, location, salary, description, company_id)
               VALUES (?, ?, ?, ?, ?, ?)`;

  const { title, company, location, salary, description, company_id } = jobData;

  const [result] = await pool.query(sql, [
    title,
    company,
    location,
    salary,
    description,
    company_id,
  ]);

  return result;
};

// Existing kept
export const fetchJobsByCompany = async (companyId) => {
  const sql = `SELECT * FROM jobs WHERE company_id = ? ORDER BY created_at DESC`;
  const [rows] = await pool.query(sql, [companyId]);
  return rows;
};

// Existing kept
export const assignCompanyRelationInJobs = async () => {
  const sql = `SELECT j.id, j.title, j.company, j.company_id, c.name AS company_name
               FROM jobs j
               JOIN companies c ON j.company_id = c.id
               ORDER BY j.created_at DESC`;

  const [rows] = await pool.query(sql);
  return rows;
};
