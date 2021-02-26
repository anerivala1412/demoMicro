import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class RentInput {
  @Field(() => String, { nullable: false })
  userId: string;

  @Field(() => String, { nullable: false })
  productId: string;

  @Field(() => String, { nullable: false })
  startDate: string;

  @Field(() => String, { nullable: false })
  endDate: string;
}
