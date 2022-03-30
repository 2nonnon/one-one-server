import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Cart } from './cart.entity';

@EntityRepository(Cart)
export class CartsRepository extends Repository<Cart> {
  private logger = new Logger('CartsRepository', { timestamp: true });
}
