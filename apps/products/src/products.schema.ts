import * as mongoose from "mongoose";
export const productSchema = new mongoose.Schema(
  {
    name: String,
    price: String,
  },
  { timestamps: true }
);
