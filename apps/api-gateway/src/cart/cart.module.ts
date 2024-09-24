import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { RmqModule } from '@app/common';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [RmqModule.register({ name: 'CART' })],
})
export class CartModule {}
