import * as mongoose from "mongoose";
export const rentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PRODUCT",
    },
  },
  { timestamps: true }
);
