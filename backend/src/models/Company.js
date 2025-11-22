import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: String,
    website: String,
    location: String,
    logo: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
    },
    industry: String,
    size: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
