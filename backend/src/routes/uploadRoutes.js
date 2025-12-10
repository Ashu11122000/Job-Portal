import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { uploadResume, uploadImage } from "../middleware/uploadMiddleware.js";

const router = Router();

// Upload resume file
router.post("/resume", protect, uploadResume.single("resume"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }
  res.status(200).json({
    success: true,
    message: "Resume uploaded successfully",
    filePath: req.file.path,
    fileName: req.file.filename,
  });
});

// Upload profile avatar image
router.post("/avatar", protect, uploadImage.single("avatar"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }
  res.status(200).json({
    success: true,
    message: "Avatar uploaded successfully",
    filePath: req.file.path,
    fileName: req.file.filename,
  });
});

export default router;
