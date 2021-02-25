import { Module } from "@nestjs/common";
import { GraphQLFederationModule } from "@nestjs/graphql";
import { join } from "path";
import { ConfigService, ConfigModule } from "@nestjs/config";
import appConfiguration from "../../config/app";
import dbConfiguration from "../../config/database";

import * as path from "path";

import { ProductsService } from "./products.service";
import { MongooseModule } from "@nestjs/mongoose";
import { productSchema } from "./products.schema";
import { ProductsResolver } from "./products.resolver";
import { User } from "../../users/src/user.model";
import { Product } from "./products.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "PRODUCT", schema: productSchema }]),
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
      autoSchemaFile: join(process.cwd(), "apps/products/src/schema.gql"),
      buildSchemaOptions: { orphanedTypes: [User, Product] },
    }),
  ],
  providers: [ProductsService, ProductsResolver, ConfigService],
})
export class ProductsModule {}
