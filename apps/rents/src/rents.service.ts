import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { IRent } from "./rents.interface";
import { staticError } from "../../constant";
import { RentInput } from "./rents.input";

@Injectable()
export class RentsService {
  constructor(
    @InjectModel("RENT")
    public rentModel: Model<IRent>
  ) {}
  async create(input: RentInput) {
    const existItem = await this.rentModel.findOne({
      $and: [
        {
          userId: input.userId,
        },
        {
          productId: input.productId,
        },
      ],
    });
    if (existItem) {
      throw new Error(staticError.alreayRent);
    }
    return await this.rentModel.create(input);
  }
}
