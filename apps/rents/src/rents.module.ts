import { join } from "path";

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GraphQLFederationModule } from "@nestjs/graphql";

import { RentsService } from "./rents.service";
import { User } from "../../users/src/user.model";
import { Product } from "../../products/src/products.model";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/microdb"),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), "apps/rents/src/schema.gql"),
      buildSchemaOptions: { orphanedTypes: [User, Product] },
    }),
  ],
  providers: [RentsService],
})
export class RentsModule {}
