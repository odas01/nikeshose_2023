import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Order",
  mongoose.Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      phone: {type: String},
      address: {type: String},
      note: {type: String},
      total: {type: Number},
      status: {type: Number, default: 0},
    },
    { timestamps: true }
  )
);
