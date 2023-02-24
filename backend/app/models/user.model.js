import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "User",
  mongoose.Schema(
    {
      fullname: { type: String },
      email: { type: String, unique: true, lowercase: true },
      avt: { type: Schema.Types.ObjectId, ref: "Gallery" },
      password: { type: String },
      admin: { type: Boolean, default: false },
      blocked: { type: Boolean, default: false },
      deleted: { type: Boolean, default: false },
    },
    { timestamps: true }
  )
);
