import express from "express";
import cors from "cors";

/* -------------------- APP INIT -------------------- */
const app = express();

/* -------------------- CORS (MUST BE FIRST) -------------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://job-portal-110.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server & tools like Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("CORS not allowed for this origin"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ---- PRE-FLIGHT SUPPORT ---- */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

/* -------------------- BODY PARSER -------------------- */
app.use(express.json());

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

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/company/logo", companyLogoRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/mock-interview", mockInterviewRoutes);
app.use("/api/admin/settings", settingsRoutes);
app.use("/api/admin/logs", logsRoutes);

/* -------------------- HEALTH CHECK -------------------- */
app.get("/", (req, res) => {
  res.send("🚀 Job Portal Backend is running");
});

/* -------------------- ERROR HANDLER -------------------- */
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.message);
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

/* -------------------- START SERVER -------------------- */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
