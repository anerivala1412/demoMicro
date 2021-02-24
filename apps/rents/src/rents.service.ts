import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IRent } from "./rents.interface";

@Injectable()
export class RentsService {
  constructor(
    @InjectModel("RENT")
    private productModel: Model<IRent>
  ) {}
  async create(input) {
    return await this.productModel.create(input);
  }
}
