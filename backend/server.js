// server.js
import express from "express";
import cors from "cors";

/* -------------------- ENV CONFIG -------------------- */
if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

/* -------------------- ROUTES -------------------- */
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import companyLogoRoutes from "./routes/companyLogoRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import logsRoutes from "./routes/logsRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import coverLetterRoutes from "./routes/coverLetterRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

import logger from "./utils/logger.js";

const app = express();

/* -------------------- GLOBAL MIDDLEWARES -------------------- */
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

/* -------------------- CORS (FIXED & STABLE) -------------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://job-portal-frontend.vercel.app",
  "https://job-portal-frontend-phi-blush.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* 🔥 HARD FIX: Preflight handler */
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(204);
  }
  next();
});

logger.info("✅ CORS & middlewares initialized");

/* -------------------- API ROUTES -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/company/logo", companyLogoRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/admin/settings", settingsRoutes);
app.use("/api/admin/logs", logsRoutes);
app.use("/api/cover-letter", coverLetterRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/analytics", analyticsRoutes);

/* -------------------- HEALTH CHECK -------------------- */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    env: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

/* -------------------- 404 HANDLER -------------------- */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

/* -------------------- GLOBAL ERROR HANDLER -------------------- */
app.use((err, req, res, next) => {
  logger.error("🔥 SERVER ERROR", {
    path: req.originalUrl,
    message: err.message,
    stack: err.stack,
  });

  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

/* -------------------- SERVER -------------------- */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
});
