import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { PRODUCT_UNIT } from "../../enum/global.enum";

@ObjectType()
@Directive("@extends")
@Directive('@key(fields: "id")')
export class Product {
  @Field((type) => ID)
  @Directive("@external")
  id: number;

  @Field()
  name: string;

  @Field()
  price: string;

  @Field(() => PRODUCT_UNIT,{nullable:true})
  unit: PRODUCT_UNIT;

  constructor(product: Partial<Product>) {
    Object.assign(product);
  }
}
