import { join } from "path";

import { Module } from "@nestjs/common";
import { GraphQLFederationModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService, ConfigModule } from "@nestjs/config";
import appConfiguration from "../../config/app";
import dbConfiguration from "../../config/database";
import { productSchema } from "./products.schema";
import { ProductsResolver } from "./products.resolver";
import { ProductsService } from "./products.service";
import { JwtCommonService } from "../../auth/jwt.service";

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
    }),
  ],
  providers: [ProductsResolver, ProductsService, JwtCommonService],
})
export class ProductsModule {}
