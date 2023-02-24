import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "OrderDetail",
  mongoose.Schema(
    {
      order: { type: Schema.Types.ObjectId, ref: "OrderDetail" },
      productOption: { type: Schema.Types.ObjectId, ref: "ProductOption" },
      size: { type: Number },
      qty: { type: Number },
      price: { type: Number },
      total: { type: Number },
    },
    { timestamps: true }
  )
);
