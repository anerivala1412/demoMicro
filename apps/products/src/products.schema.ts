import * as mongoose from "mongoose";
export const productSchema = new mongoose.Schema(
  {
    name: String,
    price: String,
    unit: String,
    isRented: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
