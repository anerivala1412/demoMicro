import { join } from "path";

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GraphQLFederationModule } from "@nestjs/graphql";
import { ConfigService, ConfigModule } from "@nestjs/config";
import appConfiguration from "../../config/app";
import dbConfiguration from "../../config/database";

import { RentsService } from "./rents.service";
import { rentSchema } from "./rents.schema";
import { RentResolver } from "./rents.resolver";
import { User } from "../../users/src/user.model";
import { Product } from "../../products/src/products.model";
import { ProductsResolver } from "../../products/src/products.resolver";
import { ProductsService } from "../../products/src/products.service";
import { UsersResolver } from "../../users/src/users.resolver";
import { UsersService } from "../../users/src/users.service";
import { productSchema } from "../../products/src/products.schema";
import { userSchema } from "../../users/src/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "RENT", schema: rentSchema },
      { name: "PRODUCT", schema: productSchema },
      { name: "USER", schema: userSchema },
    ]),
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
      autoSchemaFile: join(process.cwd(), "apps/rents/src/schema.gql"),
      buildSchemaOptions: { orphanedTypes: [User, Product] },
    }),
  ],
  providers: [
    RentsService,
    RentResolver,
    ProductsResolver,
    ProductsService,
    UsersResolver,
    UsersService,
  ],
})
export class RentsModule {}
