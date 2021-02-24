import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IProduct } from "./products.interface";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel("PRODUCT")
    private productModel: Model<IProduct>
  ) {}

  async findAll() {
    return await this.productModel.find();
  }
  async create(input) {
    return await this.productModel.create(input);
  }
}
