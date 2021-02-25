import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  url: process.env.DATABASE_URL,
  //   jwtSecretKey: process.env.JWT_SECRET_KEY,
  //   calendlyApiToken: process.env.JWT_CALENDLY_API_TOKEN,
  //   emailServiceUrl: process.env.EMAIL_MICROSERVICE_URL,
  //   verifyAccountRoute: process.env.WEB_ACCOUNT_VERIFY,
}));
