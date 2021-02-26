import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "../../users/src/user.model";
import { Product } from "../../products/src/products.model";
import { DATETIME } from "../../config/date.scalar";

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

  @Field(() => DATETIME, { nullable: true })
  createdAt: any;

  @Field(() => DATETIME, { nullable: true })
  updatedAt: any;

  @Field(() => DATETIME, { nullable: true })
  startDate: any;

  @Field(() => DATETIME, { nullable: true })
  endDate: any;

  constructor(rent: Partial<Rent>) {
    Object.assign(rent);
  }
}
