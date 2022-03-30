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
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
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
    @GetUser() user: User,
  ): Promise<Category> {
    this.loggor.verbose(
      `User "${user.username}" create a category, Category ${JSON.stringify(
        createCategoryDto,
      )}`,
    );
    return this.categoriesService.createCategory(createCategoryDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteCategory(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.loggor.verbose(`User "${user.username}" detele category ${id}`);
    return this.categoriesService.deleteCategory(id, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateCategory(
    @Param('id') id: number,
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    this.loggor.verbose(
      `User "${user.username}" update category ${id}, Category ${JSON.stringify(
        createCategoryDto,
      )}`,
    );
    return this.categoriesService.updateCategory(id, createCategoryDto, user);
  }
}
