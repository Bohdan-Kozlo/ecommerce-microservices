import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @Inject('PRODUCT') private readonly productClient: ClientProxy,
  ) {}

  async addProductToCart(userId: number, productId: number, quantity: number) {
    const product = await firstValueFrom(
      this.productClient.send('get_product_by_id', { id: productId }),
    );

    if (!product) {
      return null;
    }

    let cart = await this.cartRepository.findOne({ where: { userId } });
    if (!cart) {
      cart = this.cartRepository.create({ userId, items: [] });
    }

    let cartItem = await this.cartItemRepository.findOne({
      where: { cart: { id: cart.id }, product_id: product.id },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.price_at_addition = quantity * product.price;
    } else {
      cartItem = this.cartItemRepository.create({
        product_id: productId,
        quantity: quantity,
        price_at_addition: product.price * quantity,
      });
      cart.items.push(cartItem);
    }

    await this.cartItemRepository.save(cartItem);
    return this.cartRepository.save(cart);
  }

  async removeProductFromCart(userId: number, productId: number) {
    const cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['items'],
    });
    if (!cart) {
      return null;
    }

    const cartItem = cart.items.find((item) => item.product_id === productId);

    if (!cartItem) {
      return null;
    }

    cart.items = cart.items.filter((item) => item.product_id !== productId);
    await this.cartItemRepository.remove(cartItem);
    return this.cartRepository.save(cart);
  }

  async updateCartItemQuantity(
    userId: number,
    productId: number,
    quantity: number,
  ) {
    const cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['items'],
    });
    if (!cart) {
      return null;
    }

    const cartItem = cart.items.find((item) => item.product_id === productId);
    if (!cartItem) {
      return null;
    }

    cartItem.quantity = quantity;
    await this.cartItemRepository.save(cartItem);
    return this.cartRepository.save(cart);
  }

  async getCart(userId: number) {
    const cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['items'],
    });
    if (!cart) {
      return null;
    }
    return cart;
  }
}
