import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CartService {
  constructor(@Inject('CART') private cartClient: ClientProxy) {}

  async addProductToCart(userId: number, productId: number, quantity: number) {
    const response = this.cartClient.send(
      { cmd: 'add_product_to_cart' },
      { userId, productId, quantity },
    );

    const result = await lastValueFrom(response);
    if (!result) {
      throw new NotFoundException(
        `Product with ID ${productId} not found or cannot be added to cart`,
      );
    }

    return result;
  }

  async removeProductFromCart(userId: number, productId: number) {
    const response = this.cartClient.send(
      { cmd: 'remove_product_from_cart' },
      { userId, productId },
    );

    const result = await lastValueFrom(response);
    if (!result) {
      throw new NotFoundException(
        `Product with ID ${productId} not found in cart`,
      );
    }

    return result;
  }

  async getCart(userId: number) {
    const response = this.cartClient.send({ cmd: 'get_cart' }, userId);

    const cart = await lastValueFrom(response);
    if (!cart) {
      throw new NotFoundException(`Cart for user with ID ${userId} not found`);
    }

    return cart;
  }

  async updateCartItemQuantity(
    userId: number,
    productId: number,
    quantity: number,
  ) {
    const response = this.cartClient.send(
      { cmd: 'update_product_quantity_to_cart' },
      { userId, quantity, productId },
    );

    const cart = await lastValueFrom(response);
    if (!cart) {
      throw new NotFoundException(
        `Cart with ProductId ${productId} not found or not be updated`,
      );
    }

    return cart;
  }
}
