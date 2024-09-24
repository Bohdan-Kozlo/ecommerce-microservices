import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entitys/cart.entity';
import { CartItem } from './entitys/cart-item.entity';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'cart-db',
      port: 5432,
      username: 'cart_user',
      password: 'cart_password',
      database: 'cart_db',
      entities: [Cart, CartItem],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Cart, CartItem]),
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/cart-service/.env',
    }),
    RmqModule.register({ name: 'PRODUCT' }),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartServiceModule {}
