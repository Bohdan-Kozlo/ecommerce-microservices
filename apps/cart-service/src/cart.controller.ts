import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern({ cmd: 'add_product_to_cart' })
  async addProductToCart(@Payload() data: any) {
    const { userId, productId, quantity } = data;
    return await this.cartService.addProductToCart(userId, productId, quantity);
  }

  @MessagePattern({ cmd: 'remove_product_from_cart' })
  async removeProductFromCart(
    @Payload() data: { userId: number; productId: number },
  ) {
    const { userId, productId } = data;
    return await this.cartService.removeProductFromCart(userId, productId);
  }

  @MessagePattern({ cmd: 'get_cart' })
  async getCart(@Payload() userId: number) {
    return await this.cartService.getCart(userId);
  }

  @MessagePattern({ cmd: 'update_product_quantity_to_cart' })
  async updateCart(
    @Payload() data: { userId: number; productId: number; quantity: number },
  ) {
    return await this.cartService.updateCartItemQuantity(
      data.userId,
      data.productId,
      data.quantity,
    );
  }
}
