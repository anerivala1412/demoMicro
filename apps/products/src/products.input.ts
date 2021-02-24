import { InputType, Field, OmitType } from "@nestjs/graphql";

@InputType()
export class CreateProductInput {
  @Field(() => String, { nullable: false })
  price: string;

  @Field(() => String, { nullable: false })
  name: string;
}

@InputType()
export class ProductUpdateInput extends OmitType(
  CreateProductInput,
  [] as const
) {
  @Field(() => String)
  _id: string;
}
