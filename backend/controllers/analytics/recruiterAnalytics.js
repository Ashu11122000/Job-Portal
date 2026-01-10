import db from "../../config/db.js";

export const recruiterAnalytics = async (req, res, next) => {
  try {
    const recruiterId = req.params.id;

    const [jobRows] = await db.execute("SELECT * FROM jobs WHERE recruiter_id = ?", [recruiterId]);
    const [appRows] = await db.execute("SELECT * FROM applications WHERE recruiter_id = ?", [recruiterId]);

    const approvedJobs = jobRows.filter(j => j.status === "approved").length;
    const pendingJobs = jobRows.filter(j => j.status === "pending").length;
    const totalViews = jobRows.reduce((sum, j) => sum + (j.views || 0), 0);
    const avgSalary = jobRows.length
      ? (jobRows.reduce((sum, j) => sum + (Number(j.salary) || 0), 0) / jobRows.length).toFixed(1)
      : 0;

    res.status(200).json({
      success: true,
      analytics: {
        jobsPosted: jobRows.length,
        approvedJobs,
        pendingJobs,
        totalViews,
        avgSalary,
        totalApplications: appRows.length,
        offered: appRows.filter(a => a.status === "offered").length,
        shortlisted: appRows.filter(a => a.status === "shortlisted").length
      },
    });
  } catch (err) {
    next(err);
  }
};
