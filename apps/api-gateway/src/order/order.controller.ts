import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('place')
  async placeOrder(
    @Body()
    createOrderDto: {
      userId: number;
      items: { productId: number; quantity: number; price: number }[];
    },
  ) {
    return this.orderService.placeOrder(
      createOrderDto.userId,
      createOrderDto.items,
    );
  }

  @Get('history/:userId')
  async getOrderHistory(@Param('userId') userId: number) {
    return this.orderService.getOrderHistory(userId);
  }

  @Get('status/:orderId')
  async getOrderStatus(@Param('orderId') orderId: number) {
    return this.orderService.getOrderStatus(orderId);
  }

  @Patch('status/:orderId')
  async updateOrderStatus(
    @Param('orderId') orderId: number,
    @Body() updateStatusDto: { status: string },
  ) {
    return this.orderService.updateOrderStatus(orderId, updateStatusDto.status);
  }
}
