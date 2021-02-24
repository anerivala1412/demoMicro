import { Document } from "mongoose";

export interface IRent extends Document {
  userId: any;
  productId: any;
}
