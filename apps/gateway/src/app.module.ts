import { Module } from "@nestjs/common";
import { GraphQLGatewayModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_GUARD } from "@nestjs/core";

import { userSchema } from "../../users/src/user.schema";
import { productSchema } from "../../products/src/products.schema";
import { RolesGuard } from "../../auth/role.guard";

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
          { name: "products", url: "http://[::1]:3003/graphql" },
        ],
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
