import * as mongoose from "mongoose";
export const productSchema = new mongoose.Schema(
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
