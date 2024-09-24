import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('user', true));
  await app.startAllMicroservices();
}
bootstrap();
