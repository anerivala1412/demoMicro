import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: string;
  unit: string;
  isRented: boolean;
}
