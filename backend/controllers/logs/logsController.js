import db from "../../config/db.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getLogs = asyncHandler(async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM admin_logs ORDER BY id DESC");
  res.status(200).json({ success: true, logs: rows });
});

export const deleteLog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Add delete log before removing (dynamic + interview-friendly)
  const [logRow] = await db.execute("SELECT log FROM admin_logs WHERE id = ?", [id]);
  const deletedText = logRow[0]?.log || `Log ${id}`;

  await db.execute("DELETE FROM admin_logs WHERE id = ?", [id]);

  await db.execute(
    "INSERT INTO admin_logs (log, time) VALUES (?, ?)",
    [`Deleted log: ${deletedText}`, new Date().toLocaleTimeString()]
  );

  res.status(200).json({ success: true, message: "Log deleted" });
});
