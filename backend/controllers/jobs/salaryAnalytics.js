import db from "../../config/db.js";

export const salaryAnalytics = async (req, res, next) => {
  try {
    const recruiterId = req.params.recruiterId;

    const [rows] = await db.execute(`
      SELECT 
        MIN(salary) AS lowestSalary,
        MAX(salary) AS highestSalary,
        AVG(salary) AS avgSalary
      FROM jobs
      WHERE recruiter_id = ?
    `, [recruiterId]);

    res.status(200).json({
      success: true,
      data: {
        lowestSalary: rows[0]?.lowestSalary || 0,
        highestSalary: rows[0]?.highestSalary || 0,
        avgSalary: Number(rows[0]?.avgSalary || 0).toFixed(2)
      }
    });

  } catch (err) {
    next(err);
  }
};
