import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Attribute } from './attribute.entity';
import { Attributes } from './attributes.inteface';
import { CreateAttributeDto } from './dto/create-attribute.dto';

@EntityRepository(Attribute)
export class AttributesRepository extends Repository<Attribute> {
  private logger = new Logger('AttributesRepository', { timestamp: true });

  async getAttributes(): Promise<Attributes[]> {
    const map = new Map<number, Attributes>();
    const attributes = await this.find();

    if (attributes.length === 0) {
      throw new NotFoundException(`Attributes not found`);
    }

    attributes.forEach((item) => {
      if (item.parentId === 0) {
        map.set(item.id, item);
        map.get(item.id).children = [];
      }
    });
    attributes.forEach((item) => {
      if (item.parentId !== 0) {
        map.get(item.parentId).children.push(item);
      }
    });
    return Array.from(map.values());
  }

  async createAttribute(
    createAttributeDto: CreateAttributeDto,
    user: User,
  ): Promise<Attribute> {
    const { name, parentId } = createAttributeDto;

    if (parentId !== 0) {
      const parent = await this.findOneOrFail(parentId);
      if (!parent) {
        throw new NotFoundException(`Parent with id ${parentId} is not exist`);
      }
    }

    const attribute = this.create({
      name,
      parentId,
    });

    try {
      await this.save(attribute);
      return attribute;
    } catch (error) {
      this.logger.error(
        `Failed to create attribute with ${JSON.stringify(
          createAttributeDto,
        )} for user "${user.username}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async deleteAttribute(id: number, user: User): Promise<void> {
    const result = await this.delete({ id });
    await this.delete({ parentId: id });

    if (result.affected === 0) {
      throw new NotFoundException(`Attribute with ID "${id}" not found`);
    }
  }

  async updateAttribute(
    id: number,
    createAttributeDto: CreateAttributeDto,
    user: User,
  ): Promise<Attribute> {
    const attribute = await this.findOneOrFail({ id });

    if (!attribute) {
      throw new NotFoundException(`Attribute with ID "${id}" not found`);
    }

    const { name, parentId } = createAttributeDto;

    if (parentId !== 0) {
      const parent = await this.findOneOrFail(parentId);
      if (!parent) {
        throw new NotFoundException(`Parent with id ${parentId} is not exist`);
      }
    }

    attribute.name = name;
    attribute.parentId = parentId;

    try {
      await this.save(attribute);
      return attribute;
    } catch (error) {
      this.logger.error(
        `Failed to update attribute by ${id} with ${JSON.stringify(
          createAttributeDto,
        )} for user "${user.username}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
