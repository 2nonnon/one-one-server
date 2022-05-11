import { Attributes } from './attributes.inteface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from './attribute.entity';
import { AttributesRepository } from './attributes.repository';
import { CreateAttributeDto } from './dto/create-attribute.dto';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(AttributesRepository)
    private attributesRepository: AttributesRepository,
  ) {}

  async getAttributes(): Promise<Attributes[]> {
    return this.attributesRepository.getAttributes();
  }

  async createAttribute(
    createAttributeDto: CreateAttributeDto,
  ): Promise<Attribute> {
    return this.attributesRepository.createAttribute(createAttributeDto);
  }

  async deleteAttribute(id: number): Promise<void> {
    return this.attributesRepository.deleteAttribute(id);
  }

  async updateAttribute(
    id: number,
    createAttributeDto: CreateAttributeDto,
  ): Promise<Attribute> {
    return this.attributesRepository.updateAttribute(id, createAttributeDto);
  }
}
