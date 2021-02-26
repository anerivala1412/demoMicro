import { join } from "path";

import { Module } from "@nestjs/common";
import { GraphQLFederationModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService, ConfigModule } from "@nestjs/config";
import appConfiguration from "../../config/app";
import dbConfiguration from "../../config/database";

import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { userSchema } from "./user.schema";
import { JwtCommonService } from "../../auth/jwt.service";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: "USER", schema: userSchema }]),
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get("database.url"),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [appConfiguration, dbConfiguration],
    }),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), "apps/users/src/schema.gql"),
    }),
  ],
  providers: [UsersResolver, UsersService, JwtCommonService],
})
export class UsersModule {}
