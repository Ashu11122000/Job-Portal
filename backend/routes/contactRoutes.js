import express from "express";
import { submitContactForm } from "../controllers/contact/contactController.js";
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", rateLimiter, submitContactForm);

export default router;
