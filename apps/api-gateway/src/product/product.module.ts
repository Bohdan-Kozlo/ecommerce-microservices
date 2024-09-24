import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    RmqModule.register({
      name: 'PRODUCT',
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
