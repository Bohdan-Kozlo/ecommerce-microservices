import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entitys/product.entity';
import { Repository } from 'typeorm';
import { Category } from './entitys/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createProduct(productData: any) {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async updateProduct(id: number, updateData: any): Promise<Product> {
    await this.productRepository.update(id, updateData);
    return this.productRepository.findOneBy({ id });
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
  }

  async createCategory(categoryData: any) {
    const category = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(category);
  }

  async getCategoryById(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async addProductToCategory(category_id: number, product_id: number) {
    const product = await this.productRepository.findOneBy({ id: product_id });
    if (!product) {
      return null;
    }

    const category = await this.categoryRepository.findOneBy({
      id: category_id,
    });
    if (!category) {
      return null;
    }

    product.category = category;
    await this.productRepository.save(product, { reload: true });

    return await this.productRepository.findOne({
      where: { id: product_id },
      relations: ['category'],
    });
  }
}
