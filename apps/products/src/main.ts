import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ProductsModule } from "./products.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  const config = app.get(ConfigService);
  await app.listen(config.get("app.productPort"));
  const url = await app.getUrl();
  Logger.log(`${url}/graphql`);
}
bootstrap();
