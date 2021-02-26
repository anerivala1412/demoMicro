import { Document, ObjectId } from "mongoose";

export interface IRent extends Document {
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
}
