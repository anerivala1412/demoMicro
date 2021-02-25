import { join } from "path";

import { Module } from "@nestjs/common";
import { GraphQLFederationModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { userSchema } from "./user.schema";
import { ConfigModule, ConfigService } from "@nestjs/config";
import appConfiguration from "./../../config/app";
import dbConfiguration from "./../../config/database";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration, dbConfiguration],
    }),
    MongooseModule.forFeature([{ name: "USER", schema: userSchema }]),
    // MongooseModule.forRootAsync({
    //   imports: [
    //     ConfigModule.forRoot({
    //       isGlobal: true,
    //     }),
    //   ],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get("app.url"),
    //   }),
    //   inject: [ConfigService],
    // }),
    
    MongooseModule.forRoot("mongodb://localhost/microdb"),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), "apps/users/src/schema.gql"),
    }),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}