import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('shopping-detail')
export class ShippingDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.shippingDetails)
  order: Order;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  postal_code: string;

  @Column()
  country: string;

  @Column()
  shipping_method: string;

  @Column()
  tracking_number: string;
}
