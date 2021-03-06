import { Category } from './category.entity';
import { EntityRepository, Repository } from 'typeorm';
import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Categories } from './categories.inteface';
import { CreateCategoryDto } from './dto/create-category.dto';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
  private logger = new Logger('CategoriesRepository', { timestamp: true });

  async getCategories(): Promise<Categories[]> {
    const map = new Map<number, Categories>();
    const categories = await this.find();

    if (categories.length === 0) {
      throw new NotFoundException(`Categories not found`);
    }

    categories.forEach((item) => {
      if (item.parentId === 0) {
        map.set(item.id, item);
        map.get(item.id).children = [];
      }
    });
    categories.forEach((item) => {
      if (item.parentId !== 0) {
        map.get(item.parentId).children.push(item);
      }
    });
    return Array.from(map.values());
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name, parentId } = createCategoryDto;

    if (parentId !== 0) {
      const parent = await this.findOneOrFail(parentId);
      if (!parent) {
        throw new NotFoundException(`Parent with id ${parentId} is not exist`);
      }
    }

    const category = this.create({
      name,
      parentId,
    });

    try {
      await this.save(category);
      return category;
    } catch (error) {
      this.logger.error(
        `Failed to create category with ${JSON.stringify(createCategoryDto)}.`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async deleteCategory(id: number): Promise<void> {
    const result = await this.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Address with ID "${id}" not found`);
    }
  }

  async updateCategory(
    id: number,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOneOrFail({ id });

    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    const { name, parentId } = createCategoryDto;

    if (parentId !== 0) {
      const parent = await this.findOneOrFail(parentId);
      if (!parent) {
        throw new NotFoundException(`Parent with id ${parentId} is not exist`);
      }
    }

    category.name = name;
    category.parentId = parentId;

    try {
      await this.save(category);
      return category;
    } catch (error) {
      this.logger.error(
        `Failed to update category by ${id} with ${JSON.stringify(
          createCategoryDto,
        )} .`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
