import express from "express";
import cors from "cors";

/* -------------------- ENV CONFIG -------------------- */
// Load dotenv only locally
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
import mockInterviewRoutes from "./routes/mockInterviewRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import logsRoutes from "./routes/logsRoutes.js";

import logger from "./utils/logger.js";

const app = express();

/* -------------------- MIDDLEWARES -------------------- */
app.use(express.json());

/* -------------------- CORS (PRODUCTION SAFE) -------------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://job-portal-frontend.vercel.app",
  "https://job-portal-frontend-phi-blush.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server, Postman, Railway health checks
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

logger.info("✅ Middlewares initialized");

/* -------------------- API ROUTES -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.use("/api/company", companyRoutes);
app.use("/api/company/logo", companyLogoRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/mock-interview", mockInterviewRoutes);
app.use("/api/admin/settings", settingsRoutes);
app.use("/api/admin/logs", logsRoutes);

logger.info("✅ All routes loaded");

/* -------------------- HEALTH CHECK -------------------- */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", uptime: process.uptime() });
});

/* -------------------- ERROR HANDLER -------------------- */
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR →", err.message);
  logger.error(err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

/* -------------------- SERVER -------------------- */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
