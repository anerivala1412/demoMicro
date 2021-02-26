import { Module } from "@nestjs/common";
import { GraphQLGatewayModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_GUARD } from "@nestjs/core";
import { ConfigService, ConfigModule } from "@nestjs/config";
import appConfiguration from "../../config/app";
import dbConfiguration from "../../config/database";

import { userSchema } from "../../users/src/user.schema";
import { productSchema } from "../../products/src/products.schema";
import { RolesGuard } from "../../auth/role.guard";
import { JwtCommonService } from "../../auth/jwt.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "USER", schema: userSchema },
      { name: "PRODUCT", schema: productSchema },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get("database.url"),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [appConfiguration, dbConfiguration],
    }),
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
    JwtCommonService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
