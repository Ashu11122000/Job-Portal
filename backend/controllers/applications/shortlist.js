import db from "../../config/db.js";

export const shortlistCandidate = async (req, res, next) => {
  try {
    const appId = req.params.id;
    await db.execute("UPDATE applications SET status = 'shortlisted' WHERE id = ?", [appId]);

    const [rows] = await db.execute("SELECT * FROM applications WHERE id = ?", [appId]);
    res.status(200).json({ success: true, application: rows[0] });
  } catch (err) {
    next(err);
  }
};
