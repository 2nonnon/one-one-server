import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from './categories.inteface';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';
import { Category } from './category.entity';

@Controller('categories')
export class CategoriesController {
  private loggor = new Logger('CategoriesController', { timestamp: true });

  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(): Promise<Categories[]> {
    this.loggor.verbose(`retrieving all categories`);
    return this.categoriesService.getCategories();
  }

  @Post()
  @UseGuards(AuthGuard())
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    this.loggor.verbose(
      ` create a category, Category ${JSON.stringify(createCategoryDto)}`,
    );
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteCategory(@Param('id') id: number): Promise<void> {
    this.loggor.verbose(`detele category ${id}`);
    return this.categoriesService.deleteCategory(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateCategory(
    @Param('id') id: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    this.loggor.verbose(
      `update category ${id}, Category ${JSON.stringify(createCategoryDto)}`,
    );
    return this.categoriesService.updateCategory(id, createCategoryDto);
  }
}
