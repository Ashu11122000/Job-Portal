import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Under Review", "Shortlisted", "Rejected", "Hired"],
      default: "Applied",
    },
    coverLetter: String,
    resume: String, // candidate resume at application time
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
