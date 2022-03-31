import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Sku } from './sku.entity';

@EntityRepository(Sku)
export class SkusRepository extends Repository<Sku> {
  private logger = new Logger('SkusRepository', { timestamp: true });
}
