import { InputType, Field, OmitType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  password: string;
}

@InputType()
export class UserUpdateInput extends OmitType(CreateUserInput, [
  "email",
] as const) {
  @Field(() => String)
  _id: string;
}

@InputType()
export class LoginInput {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;
}
