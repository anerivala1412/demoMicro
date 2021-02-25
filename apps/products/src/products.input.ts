import { InputType, Field, OmitType } from "@nestjs/graphql";
import { PRODUCT_UNIT } from "../../enum/global.enum";

@InputType()
export class CreateProductInput {
  @Field(() => String, { nullable: false })
  price: string;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => PRODUCT_UNIT, { nullable: false })
  unit: PRODUCT_UNIT;
}

@InputType()
export class ProductUpdateInput extends OmitType(
  CreateProductInput,
  [] as const
) {
  @Field(() => String)
  _id: string;
}
