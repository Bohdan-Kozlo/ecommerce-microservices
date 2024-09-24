import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { RmqModule } from '@app/common';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    RmqModule.register({ name: 'ORDER' }),
    RmqModule.register({ name: 'NOTIFICATION' }),
    RmqModule.register({ name: 'USER' }),
  ],
})
export class OrderModule {}
