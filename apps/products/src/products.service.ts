import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IProduct } from "./products.interface";
import { ObjectId } from "mongodb";
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel("PRODUCT")
    private productModel: Model<IProduct>
  ) {}

  async findAll(query) {
    console.log()
    return await this.productModel.find({ ...query });
  }
  async create(input) {
    return await this.productModel.create(input);
  }

  async getOne(id) {
    return await this.productModel.findOne({ _id: new ObjectId(id) });
  }
}
