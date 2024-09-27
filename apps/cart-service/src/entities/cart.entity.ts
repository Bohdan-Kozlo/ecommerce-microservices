import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];
}
