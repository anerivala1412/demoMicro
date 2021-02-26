import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { IRent } from "./rents.interface";
import { staticError } from "../../constant";
import { RentInput } from "./rents.input";
import { IProduct } from "../../products/src/products.interface";

@Injectable()
export class RentsService {
  constructor(
    @InjectModel("RENT")
    public rentModel: Model<IRent>,
    @InjectModel("PRODUCT")
    public productModel: Model<IProduct>
  ) {}

  async findAll(query) {
    return (await this.rentModel.distinct("productId", { ...query })) || [];
  }

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
    const rentItem = await this.rentModel.create(input);
    await this.productModel.findByIdAndUpdate(
      { _id: rentItem.productId },
      { isRented: true }
    );
    return rentItem;
  }
}
