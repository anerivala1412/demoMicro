import * as mongoose from "mongoose";
export const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: mongoose.Schema.Types.String,
      unique: true,
    },
    password: String,
  },
  { timestamps: true }
);
