import jobRoutes from "../routes/jobRoutes.js";

export default function registerRoutes(app) {
  app.use("/api/jobs", jobRoutes);
}
