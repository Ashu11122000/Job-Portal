import { uploadCompanyLogo } from "../../middleware/multerConfig.js";
import pool from "../../config/db.js";

export const companyLogoUpload = (req, res) => {
  uploadCompanyLogo(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const logoPath = req.file.path;
    const id = req.params.id;

    await pool.query(`UPDATE companies SET logo=? WHERE id=?`, [logoPath, id]);

    res.status(200).json({
      success: true,
      message: "Logo uploaded successfully",
      logo: logoPath,
    });
  });
};
