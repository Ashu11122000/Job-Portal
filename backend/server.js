import express from "express";
import cors from "cors";

// ⚠️ IMPORTANT: Load dotenv ONLY in local development
if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import companyLogoRoutes from "./routes/companyLogoRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import mockInterviewRoutes from "./routes/mockInterviewRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import logsRoutes from "./routes/logsRoutes.js";

import logger from "./utils/logger.js";

const app = express();

/* -------------------- MIDDLEWARES -------------------- */

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",              // local dev
      "https://your-frontend.vercel.app",   // production frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

logger.info("Middlewares initialized");

/* -------------------- ROUTES -------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.use("/api/company", companyRoutes);
logger.info("Company routes loaded successfully");

app.use("/api/company/logo", companyLogoRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/mock-interview", mockInterviewRoutes);
app.use("/api/admin/settings", settingsRoutes);
app.use("/api/admin/logs", logsRoutes);

/* -------------------- ERROR HANDLER -------------------- */

app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR →", err);
  logger.error(`API Crash: ${err.message}`);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

/* -------------------- SERVER -------------------- */

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
