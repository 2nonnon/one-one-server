import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Attribute } from './attribute.entity';

@EntityRepository(Attribute)
export class AttributesRepository extends Repository<Attribute> {
  private logger = new Logger('AttributesRepository', { timestamp: true });
}
