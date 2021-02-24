import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ProductsModule } from "./products.module";

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  await app.listen(3003);
  const url = await app.getUrl();
  Logger.log(`${url}/graphql`);
}
bootstrap();
