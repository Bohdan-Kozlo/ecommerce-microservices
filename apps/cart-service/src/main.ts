import { NestFactory } from '@nestjs/core';
import { CartServiceModule } from './cart-service.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(CartServiceModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('cart', true));
  await app.startAllMicroservices();
}
bootstrap();
