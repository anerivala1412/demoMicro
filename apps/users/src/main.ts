import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

import { UsersModule } from "./users.module";

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  const config = app.get(ConfigService);

  await app.listen(config.get("app.userPort"));
  const url = await app.getUrl();

  Logger.log(`${url}/graphql`);
}
bootstrap();
