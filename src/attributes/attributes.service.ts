import { Attributes } from './attributes.inteface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Attribute } from './attribute.entity';
import { AttributesRepository } from './attributes.repository';
import { CreateAttributeDto } from './dto/create-attribute.dto';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(AttributesRepository)
    private categoriesRepository: AttributesRepository,
  ) {}

  async getAttributes(): Promise<Attributes[]> {
    return this.categoriesRepository.getAttributes();
  }

  async createAttribute(
    createAttributeDto: CreateAttributeDto,
    user: User,
  ): Promise<Attribute> {
    return this.categoriesRepository.createAttribute(createAttributeDto, user);
  }

  async deleteAttribute(id: number, user: User): Promise<void> {
    return this.categoriesRepository.deleteAttribute(id, user);
  }

  async updateAttribute(
    id: number,
    createAttributeDto: CreateAttributeDto,
    user: User,
  ): Promise<Attribute> {
    return this.categoriesRepository.updateAttribute(
      id,
      createAttributeDto,
      user,
    );
  }
}
