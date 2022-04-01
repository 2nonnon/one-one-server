import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { OrderDetail } from './order-detail.entity';

@EntityRepository(OrderDetail)
export class OrderDetailsRepository extends Repository<OrderDetail> {
  private logger = new Logger('OrderDetailsRepository', { timestamp: true });
}
