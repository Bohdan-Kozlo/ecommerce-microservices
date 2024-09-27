import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'product_user',
      password: 'product_password',
      database: 'product_catalog_db',
      entities: [Product, Category],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, Category]),
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/product-service/.env',
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductServiceModule {}
