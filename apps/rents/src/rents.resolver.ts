import { Args, Mutation } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { Rent } from "./rents.model";
import { RentsService } from "./rents.service";
import { RentInput } from "./rents.input";

@Resolver((of) => Rent)
export class RentResolver {
  constructor(private rentService: RentsService) {}

  @Mutation(() => Rent, { name: "createRent" })
  async create(@Args("input") input: RentInput) {
    return this.rentService.create({
      ...input,
    });
  }
}
