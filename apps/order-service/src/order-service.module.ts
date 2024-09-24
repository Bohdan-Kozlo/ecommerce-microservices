import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entitys/order.entity';
import { OrderItem } from './entitys/order-item.entity';
import { ShippingDetail } from './entitys/shipping-detail';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'order-db',
      port: 5432,
      username: 'order_user',
      password: 'order_password',
      database: 'order_db',
      entities: [Order, OrderItem, ShippingDetail],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order, OrderItem, ShippingDetail]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderServiceModule {}
