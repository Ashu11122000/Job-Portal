import express from "express";
import { getLogs, deleteLog } from "../controllers/logs/logsController.js";

const router = express.Router();

router.get("/", getLogs);
router.delete("/:id", deleteLog);

export default router;
