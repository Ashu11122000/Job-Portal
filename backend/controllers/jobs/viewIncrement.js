import db from "../../config/db.js";

export const incrementViews = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    // Update views count
    await db.execute("UPDATE jobs SET views = views + 1 WHERE id = ?", [jobId]);

    // Fetch updated views
    const [rows] = await db.execute("SELECT views FROM jobs WHERE id = ?", [jobId]);

    res.status(200).json({
      success: true,
      views: rows[0]?.views || 0
    });
  } catch (err) {
    next(err);
  }
};
