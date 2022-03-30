import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CategoriesRepository } from './categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesRepository]), AuthModule],
  controllers: [CategoryController],
  providers: [CategoriesService],
})
export class CategoryModule {}