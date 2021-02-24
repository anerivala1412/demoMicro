import { join } from "path";

import { Module } from "@nestjs/common";
import { GraphQLFederationModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { userSchema } from "./user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "USER", schema: userSchema }]),
    MongooseModule.forRoot("mongodb://localhost/microdb"),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), "apps/users/src/schema.gql"),
    }),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
