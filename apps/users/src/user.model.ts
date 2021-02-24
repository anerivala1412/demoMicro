import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  constructor(user: Partial<User>) {
    Object.assign(user);
  }
}



@ObjectType({ isAbstract: true })
export class LoginResponse {
  @Field(() => String, { nullable: false })
  public token: string;

  @Field(() => User, { nullable: true })
  public userInfo: User;
}
