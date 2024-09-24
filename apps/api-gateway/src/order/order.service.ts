import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER') private orderClient: ClientProxy,
    @Inject('NOTIFICATION') private notificationClient: ClientProxy,
    @Inject('USER') private userClient: ClientProxy,
  ) {}

  async placeOrder(
    userId: number,
    items: { productId: number; quantity: number; price: number }[],
  ) {
    const response = this.orderClient.send(
      { cmd: 'place_order' },
      { userId, items },
    );

    const result = await lastValueFrom(response);
    if (!result) {
      throw new NotFoundException(`Could not place order for user ${userId}`);
    }

    const user = await lastValueFrom(
      this.userClient.send({ cmd: 'get_user' }, { userId }),
    );

    if (!user) {
      throw new NotFoundException(`Could not place order for user ${userId}`);
    }

    await lastValueFrom(
      this.notificationClient.send(
        { cmd: 'order-confirmation-notification' },
        {
          orderId: result.id,
          email: user.email,
        },
      ),
    );

    return result;
  }

  async getOrderHistory(userId: number) {
    const response = this.orderClient.send(
      { cmd: 'get_order_history' },
      { userId },
    );

    const history = await lastValueFrom(response);
    if (!history) {
      throw new NotFoundException(`No order history found for user ${userId}`);
    }

    return history;
  }

  async getOrderStatus(orderId: number) {
    const response = this.orderClient.send(
      { cmd: 'get_order_status' },
      { orderId },
    );

    const status = await lastValueFrom(response);
    if (!status) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return status;
  }

  async updateOrderStatus(orderId: number, status: string) {
    const response = this.orderClient.send(
      { cmd: 'update_order_status' },
      { orderId, status },
    );

    const updatedOrder = await lastValueFrom(response);
    if (!updatedOrder) {
      throw new NotFoundException(`Could not update order with ID ${orderId}`);
    }

    return updatedOrder;
  }
}
