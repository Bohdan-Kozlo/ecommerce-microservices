import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post(':userId/product')
  async addProductToCart(
    @Param('userId') userId: number,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number,
  ) {
    try {
      return await this.cartService.addProductToCart(
        userId,
        productId,
        quantity,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':userId/product/:productId')
  async removeProductFromCart(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    try {
      return await this.cartService.removeProductFromCart(userId, productId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':userId')
  async getCart(@Param('userId') userId: number) {
    try {
      return await this.cartService.getCart(userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(':userId/product')
  async updateCartItemQuantity(
    @Param('userId') userId: number,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number,
  ) {
    try {
      return await this.cartService.updateCartItemQuantity(
        userId,
        productId,
        quantity,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
