import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @Column()
  product_id: number;

  @Column('decimal')
  price_at_addition: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  added_at: Date;
}
