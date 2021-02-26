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
    startDate: {
      type: mongoose.Schema.Types.String,
    },
    endDate: {
      type: mongoose.Schema.Types.String,
    },
  },
  { timestamps: true }
);
