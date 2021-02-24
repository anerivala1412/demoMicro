import { NestFactory } from '@nestjs/core';
import { RentsModule } from './rents.module';

async function bootstrap() {
  const app = await NestFactory.create(RentsModule);
  await app.listen(3004);
}
bootstrap();
