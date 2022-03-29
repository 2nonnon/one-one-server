import { CategoriesRepository } from './categories.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './categories.inteface';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private categoriesRepository: CategoriesRepository,
  ) {}

  async getCategories(): Promise<Categories[]> {
    return this.categoriesRepository.getCategories();
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    user: User,
  ): Promise<Category> {
    return this.categoriesRepository.createCategory(createCategoryDto, user);
  }
}
