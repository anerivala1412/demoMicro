import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

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

  constructor(product: Partial<Product>) {
    Object.assign(product);
  }
}
