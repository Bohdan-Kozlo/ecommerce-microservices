import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(@Inject('PRODUCT') private productClient: ClientProxy) {}

  async createProduct(productData: any) {
    return firstValueFrom(
      this.productClient.send({ cmd: 'create_product' }, productData),
    );
  }

  async updateProduct(id: number, updateData: any) {
    const updatedProduct = await firstValueFrom(
      this.productClient.send({ cmd: 'update_product' }, { id, updateData }),
    );
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async getProductById(id: number) {
    const product = await firstValueFrom(
      this.productClient.send({ cmd: 'get_product_by_id' }, id),
    );
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async deleteProduct(id: number) {
    const result = await firstValueFrom(
      this.productClient.send({ cmd: 'delete_product' }, id),
    );
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return result;
  }

  async getAllProducts() {
    const products = await firstValueFrom(
      this.productClient.send({ cmd: 'get_all_products' }, {}),
    );
    if (!products || products.length === 0) {
      throw new NotFoundException('No products found');
    }
    return products;
  }

  async createCategory(categoryData: any) {
    return firstValueFrom(
      this.productClient.send({ cmd: 'create_category' }, categoryData),
    );
  }

  async getCategoryById(id: number) {
    const category = await firstValueFrom(
      this.productClient.send({ cmd: 'get_category_by_id' }, id),
    );
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async getAllCategories() {
    const categories = await firstValueFrom(
      this.productClient.send({ cmd: 'get_all_categories' }, {}),
    );
    if (!categories || categories.length === 0) {
      throw new NotFoundException('No categories found');
    }
    return categories;
  }

  async addProductToCategory(categoryId: number, productId: number) {
    const product = await firstValueFrom(
      this.productClient.send(
        { cmd: 'add_product_to_category' },
        { categoryId, productId },
      ),
    );
    if (!product) {
      throw new NotFoundException('Product or category not exist');
    }
    return product;
  }
}
