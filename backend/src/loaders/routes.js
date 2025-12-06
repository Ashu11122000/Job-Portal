import authRoutes from "../routes/authRoutes.js";
import jobRoutes from "../routes/jobRoutes.js";
import companyRoutes from "../routes/companyRoutes.js";
import applicationRoutes from "../routes/applicationRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import notificationRoutes from "../routes/notificationRoutes.js";
import analyticsRoutes from "../routes/analyticsRoutes.js";

export default function registerRoutes(app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/jobs", jobRoutes);
  app.use("/api/companies", companyRoutes);
  app.use("/api/applications", applicationRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/notifications", notificationRoutes);
  app.use("/api/analytics", analyticsRoutes);
  return app;
};
