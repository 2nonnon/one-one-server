import { Order } from './order.entity';
import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  private logger = new Logger('OrdersRepository', { timestamp: true });
}
