import { NestFactory } from '@nestjs/core';
import { ProductServiceModule } from './product-service.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(ProductServiceModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('product', true));
  await app.startAllMicroservices();
}
bootstrap();
