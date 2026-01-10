import db from "../../config/db.js";

export const sendOfferLetter = async (req, res, next) => {
  try {
    const appId = req.params.id;
    const { package_lpa, joining_date } = req.body;

    await db.execute(
      "UPDATE applications SET status = 'offered', package_lpa = ?, joining_date = ? WHERE id = ?",
      [package_lpa, joining_date, appId]
    );

    const [rows] = await db.execute("SELECT * FROM applications WHERE id = ?", [appId]);
    res.status(200).json({ success: true, application: rows[0] });
  } catch (err) {
    next(err);
  }
};
