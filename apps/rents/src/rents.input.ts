import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class RentInput {
  @Field(() => String, { nullable: false })
  userId: string;

  @Field(() => String, { nullable: false })
  productId: string;
}
