import {
  Args,
  Int,
  Query,
  Resolver,
  ResolveReference,
  Mutation,
} from "@nestjs/graphql";

import { User, LoginResponse } from "./user.model";
import { UsersService } from "./users.service";
import { CreateUserInput, UserUpdateInput, LoginInput } from "./user.input";
import { BadRequestException } from "@nestjs/common";
import { staticError } from "../../constant";

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.usersService.findOneById(reference.id);
  }

  @Query((returns) => User, { name: "user" })
  async getUser(@Args("id", { type: () => Int }) id: number) {
    return await this.usersService.findOneById(id);
  }

  @Mutation(() => User, { name: "createUser" })
  async create(@Args("input") input: CreateUserInput) {
    const payload = { ...input, email: input.email.toLowerCase() };
    const existUser = await this.usersService.findOne({
      email: payload.email,
    });
    if (existUser) throw new Error(`${staticError.userExist}`);
    return this.usersService.create({
      ...payload,
    });
  }

  @Mutation(() => User, { name: "updateUser" })
  async update(@Args("input") input: UserUpdateInput) {
    try {
      const payload = { ...input };
      const user = await this.usersService.update(payload);
      return user;
    } catch (error) {
      throw new BadRequestException(
        (error as Error).message,
        `${staticError.user}_UPDATE.ERROR`
      );
    }
  }

  @Mutation(() => LoginResponse, { name: "login" })
  async login(@Args("input") input: LoginInput) {
    try {
      const payload = { ...input, email: input.email.toLowerCase() };
      return await this.usersService.login(payload);
    } catch (error) {
      throw new BadRequestException(
        (error as Error).message,
        `${staticError.user}_LOGIN.ERROR`
      );
    }
  }
}
