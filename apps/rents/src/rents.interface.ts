import { Document, ObjectId } from "mongoose";

export interface IRent extends Document {
  userId: ObjectId;
  productId: ObjectId;
  createdAt: string;
  updatedAt: string;
}
