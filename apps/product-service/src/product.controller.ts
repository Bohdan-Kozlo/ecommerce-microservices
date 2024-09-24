import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'create_product' })
  async createProduct(@Payload() productData: any) {
    return this.productService.createProduct(productData);
  }

  @MessagePattern({ cmd: 'update_product' })
  async updateProduct(
    @Payload() { id, updateData }: { id: number; updateData: any },
  ) {
    return this.productService.updateProduct(id, updateData);
  }

  @MessagePattern({ cmd: 'get_product_by_id' })
  async getProductById(@Payload() id: number) {
    return this.productService.getProductById(id);
  }

  @MessagePattern({ cmd: 'delete_product' })
  async deleteProduct(@Payload() id: number) {
    return this.productService.deleteProduct(id);
  }

  @MessagePattern({ cmd: 'get_all_products' })
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @MessagePattern({ cmd: 'create_category' })
  async createCategory(@Payload() categoryData: any) {
    return this.productService.createCategory(categoryData);
  }

  @MessagePattern({ cmd: 'get_category_by_id' })
  async getCategoryById(@Payload() id: number) {
    return this.productService.getCategoryById(id);
  }

  @MessagePattern({ cmd: 'get_all_categories' })
  async getAllCategories() {
    return this.productService.getAllCategories();
  }

  @MessagePattern({ cmd: 'add_product_to_category' })
  async addProductToCategory(
    @Payload() payload: { categoryId: number; productId: number },
  ) {
    const { categoryId, productId } = payload;
    return this.productService.addProductToCategory(categoryId, productId);
  }
}
