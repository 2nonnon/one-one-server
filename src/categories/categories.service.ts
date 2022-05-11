import { CategoriesRepository } from './categories.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './categories.inteface';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

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
  ): Promise<Category> {
    return this.categoriesRepository.createCategory(createCategoryDto);
  }

  async deleteCategory(id: number): Promise<void> {
    return this.categoriesRepository.deleteCategory(id);
  }

  async updateCategory(
    id: number,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesRepository.updateCategory(id, createCategoryDto);
  }
}
