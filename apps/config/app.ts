import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  url: process.env.DATABASE_URL,
  gatewayPort: process.env.GATEWAY_PORT,
  userPort: process.env.USER_PORT,
  rentPort: process.env.RENT_PORT,
  productPort: process.env.PRODUCT_PORT,
}));
