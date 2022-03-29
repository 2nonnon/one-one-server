import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from './categories.inteface';
import { CategoriesService } from './categories.service';
import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
  private loggor = new Logger('TasksController', { timestamp: true });

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
}
