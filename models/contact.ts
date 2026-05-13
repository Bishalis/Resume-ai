import mongoose from "mongoose";

export type ContactStatus = "open" | "resolved" | "archived";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "resolved", "archived"],
      default: "open",
    },
  },
  { timestamps: true },
);

export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
