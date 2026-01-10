import db from "../../config/db.js"; 
import asyncHandler from "../../utils/asyncHandler.js";

export const getSettings = asyncHandler(async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM admin_settings");
  res.status(200).json({ success: true, settings: rows });
});

export const updateSetting = asyncHandler(async (req, res) => {
  const { key, value } = req.body;

  await db.execute(
    "UPDATE admin_settings SET setting_value = ? WHERE setting_key = ?",
    [value, key]
  );

  // Add log entry (optional but recommended, doesn't break UI)
  await db.execute(
    "INSERT INTO admin_logs (log, time) VALUES (?, ?)",
    [`Updated setting: ${key} → ${value}`, new Date().toLocaleTimeString()]
  );

  res.status(200).json({ success: true, message: "Setting updated" });
});
