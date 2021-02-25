import { Module } from "@nestjs/common";
import { GraphQLGatewayModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";

import { AppService } from "./app.service";
import { userSchema } from "../../users/src/user.schema";
import { productSchema } from "../../products/src/products.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "USER", schema: userSchema },
      { name: "PRODUCT", schema: productSchema },
    ]),
    MongooseModule.forRoot("mongodb://localhost/microdb"),
    GraphQLGatewayModule.forRoot({
      server: { cors: true },
      gateway: {
        serviceList: [
          { name: "users", url: "http://[::1]:3001/graphql" },
          // { name: "posts", url: "http://[::1]:3002/graphql" },
          { name: "products", url: "http://[::1]:3003/graphql" },
        ],
      },
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
