import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    source: {
      type: String,
      required: true,
      enum: ["Website", "Referral", "Ad", "Other"],
      default: "Website",
    },
    message: { type: String, trim: true, maxlength: 1000 },
  },
  { timestamps: true }
);

const LeadModel = mongoose.model("Lead", leadSchema);
export default LeadModel;
