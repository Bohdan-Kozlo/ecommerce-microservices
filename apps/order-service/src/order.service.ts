import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entitys/order.entity';
import { OrderItem } from './entitys/order-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async placeOrder(
    userId: number,
    items: { productId: number; quantity: number; price: number }[],
  ) {
    const order = new Order();
    order.user_id = userId;
    order.items = items.map((item) => {
      const orderItem = new OrderItem();
      orderItem.product_id = item.productId;
      orderItem.quantity = item.quantity;
      orderItem.price = item.price;
      orderItem.order = order;
      return orderItem;
    });
    order.total_amount = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );

    return await this.orderRepository.save(order);
  }

  async getOrderHistory(userId: number) {
    return await this.orderRepository.find({
      where: { user_id: userId },
      relations: ['items'],
    });
  }

  async getOrderStatus(orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      return null;
    }
    return { status: order.status };
  }

  async updateOrderStatus(orderId: number, status: string) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      return null;
    }
    order.status = status;
    return await this.orderRepository.save(order);
  }
}
