import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(+id);
  }

  @Post()
  @UseGuards(AdminGuard)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: number,
  ) {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async deleteProduct(@Param('id') id: number) {
    return await this.productService.deleteProduct(id);
  }

  @Get('/category')
  async getCategory() {
    return await this.productService.getAllCategories();
  }

  @Get('/category/:id')
  async getCategoryById(@Param('id') id: number) {
    return await this.productService.getCategoryById(id);
  }

  @Post('/category')
  @UseGuards(AdminGuard)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.productService.createCategory(createCategoryDto);
  }

  @Post(':product_id/category/:category_id')
  @UseGuards(AdminGuard)
  async addProductToCategory(
    @Param('product_id') productId: number,
    @Param('category_id') categoryId: number,
  ) {
    return await this.productService.addProductToCategory(
      categoryId,
      productId,
    );
  }
}
