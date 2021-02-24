import { Document } from "mongoose";

export interface IProduct extends Document {
  name: any;
  price: any;
}
