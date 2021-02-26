import { NestFactory } from "@nestjs/core";
import { RentsModule } from "./rents.module";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(RentsModule);
  const config = app.get(ConfigService);
  await app.listen(config.get("app.rentPort"));
  const url = await app.getUrl();
  Logger.log(`${url}/graphql`);
}
bootstrap();
