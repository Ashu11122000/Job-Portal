import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    description: String,
    resource: String, // e.g., "Job", "Application", "Company"
    resourceId: mongoose.Schema.Types.ObjectId,
    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true }
);

export default mongoose.model("ActivityLog", activityLogSchema);
