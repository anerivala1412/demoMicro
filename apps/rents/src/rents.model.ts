import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "../../users/src/user.model";
import { Product } from "../../products/src/products.model";

@ObjectType()
@Directive("@extends")
@Directive('@key(fields: "id")')
export class Rent {
  @Field((type) => ID)
  @Directive("@external")
  id: number;

  @Field((type) => Product)
  productId?: Product;

  @Field((type) => User)
  userId?: User;

  constructor(rent: Partial<Rent>) {
    Object.assign(rent);
  }
}
