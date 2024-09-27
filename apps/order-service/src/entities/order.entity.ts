import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { ShippingDetail } from './shipping-detail';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column('decimal')
  total_amount: number;

  @Column({ default: 'pending' })
  status: string;

  @Column()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ShippingDetail, (shippingDetail) => shippingDetail.order)
  shippingDetails: ShippingDetail[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];
}
