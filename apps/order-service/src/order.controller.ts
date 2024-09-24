import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'place_order' })
  async placeOrder(
    @Payload()
    {
      userId,
      items,
    }: {
      userId: number;
      items: { productId: number; quantity: number; price: number }[];
    },
  ) {
    return this.orderService.placeOrder(userId, items);
  }

  @MessagePattern({ cmd: 'get_order_history' })
  async getOrderHistory(@Payload('userId') userId: number) {
    return this.orderService.getOrderHistory(userId);
  }

  @MessagePattern({ cmd: 'get_order_status' })
  async getOrderStatus(@Payload('orderId') orderId: number) {
    return this.orderService.getOrderStatus(orderId);
  }

  @MessagePattern({ cmd: 'update_order_status' })
  async updateOrderStatus(
    @Payload() { orderId, status }: { orderId: number; status: string },
  ) {
    return this.orderService.updateOrderStatus(orderId, status);
  }
}
