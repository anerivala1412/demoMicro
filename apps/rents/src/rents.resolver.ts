import { Args, Mutation, ResolveField, Parent, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { ObjectId } from "mongodb";

import { Rent } from "./rents.model";
import { RentsService } from "./rents.service";
import { RentInput } from "./rents.input";
import { Product } from "../../products/src/products.model";
import { IRent } from "./rents.interface";
import { ProductsService } from "../../products/src/products.service";
import { UsersService } from "../../users/src/users.service";
import { User } from "../../users/src/user.model";
import { CurrentUser } from "../../auth/current-user.decorator";
import { GqlAuthGuard } from "../../auth/gql.auth.guard";
import { UseGuards } from "@nestjs/common";
import { IUser } from "../../users/src/user.interface";

@Resolver((of) => Rent)
export class RentResolver {
  constructor(
    private rentService: RentsService,
    private productService: ProductsService,
    private userService: UsersService
  ) {}

  @ResolveField(() => Product, { nullable: true })
  async productId(@Parent() rent: IRent) {
    if (!rent.productId) return null;

    return await this.productService.getOne({
      _id: new ObjectId(rent.productId),
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Product], { name: "getUserProducts" })
  async getUserProducts(@CurrentUser() user: IUser) {
    const productsIds = await this.rentService.findAll({
      userId: new ObjectId(user._id),
    });
    return (
      (await this.productService.findAll({ _id: { $in: productsIds } })) || []
    );
  }

  @ResolveField(() => User, { nullable: true })
  async userId(@Parent() rent: IRent) {
    if (!rent.userId) return null;

    return await this.userService.findOne({
      _id: new ObjectId(rent.userId),
    });
  }

  @Mutation(() => Rent, { name: "createRent" })
  async create(@Args("input") input: RentInput) {
    return this.rentService.create({
      ...input,
    });
  }
}
