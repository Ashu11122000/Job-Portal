import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/check-admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ success: true, message: "You are admin and token is valid!" });
});

export default router;
