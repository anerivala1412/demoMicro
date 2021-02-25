import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  await app.listen(config.get("app.gatewayPort"));
  const url = await app.getUrl();
  Logger.log(`${url}/grapqhl`);
}
bootstrap();
