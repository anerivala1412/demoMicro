import { Args, Parent, Query, ResolveField, Mutation } from "@nestjs/graphql";
import { BadRequestException, UseGuards } from "@nestjs/common";
import { Resolver } from "@nestjs/graphql";

import { Product } from "./products.model";
import { ProductsService } from "./products.service";
import { CreateProductInput } from "./products.input";
import { staticError } from "../../constant";
import { IUser } from "../../users/src/user.interface";
import { CurrentUser } from "../../auth/current-user.decorator";
import { GqlAuthGuard } from "../../auth/gql.auth.guard";

@Resolver((of) => Product)
export class ProductsResolver {
  constructor(private productService: ProductsService) {}

  @Query((returns) => [Product], { name: "getProducts" })
  async getProducts() {
    return await this.productService.findAll({});
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Product], { name: "getUserProducts" })
  async getUserProducts(@CurrentUser() user: IUser) {
    console.log({ user });
    return await this.productService.findAll({
      userId: user._id,
    });
  }

  @ResolveField((of) => Product, { name: "getProduct" })
  getProduct(@Parent() product: Product) {
    return { __typename: "Product", id: product.id };
  }

  @Mutation(() => Product, { name: "createProduct" })
  async create(@Args("input") input: CreateProductInput) {
    try {
      let payload = { ...input };
      return await this.productService.create(payload);
    } catch (error) {
      throw new BadRequestException(
        (error as Error).message,
        `${staticError.product}_CREATE.ERROR`
      );
    }
  }
}
