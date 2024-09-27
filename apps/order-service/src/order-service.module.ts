import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { ShippingDetail } from './entities/shipping-detail';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'order_user',
      password: 'order_password',
      database: 'order_db',
      entities: [Order, OrderItem, ShippingDetail],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order, OrderItem, ShippingDetail]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/order-service/.env',
    }),
    RmqModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderServiceModule {}
