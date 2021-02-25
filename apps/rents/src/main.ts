import { NestFactory } from '@nestjs/core';
import { RentsModule } from './rents.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(RentsModule);
  await app.listen(3004);
  const url = await app.getUrl();
  Logger.log(`${url}/graphql`);
}
bootstrap();
