import express from "express";
import { getSettings, updateSetting } from "../controllers/settings/settingsController.js";

const router = express.Router();

router.get("/", getSettings);
router.put("/", updateSetting);

export default router;
