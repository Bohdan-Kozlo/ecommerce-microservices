import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('orders-items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @Column()
  product_id: number;

  @Column('decimal')
  price: number;

  @Column()
  quantity: number;

  @Column()
  shipped_at: Date;
}
