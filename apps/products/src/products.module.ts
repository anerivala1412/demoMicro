import { Module } from "@nestjs/common";
import { GraphQLFederationModule } from "@nestjs/graphql";
import { join } from "path";

import { ProductsService } from "./products.service";
import { MongooseModule } from "@nestjs/mongoose";
import { productSchema } from "./products.schema";
import { ProductsResolver } from "./products.resolver";
import { User } from "../../users/src/user.model";
import { Product } from "./products.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "PRODUCT", schema: productSchema }]),
    MongooseModule.forRoot("mongodb://localhost/microdb"),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), "apps/products/src/schema.gql"),
      buildSchemaOptions: { orphanedTypes: [User, Product] },
    }),
  ],
  providers: [ProductsService, ProductsResolver],
})
export class ProductsModule {}
