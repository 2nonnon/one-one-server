import { Order } from './order.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from '../auth/user.entity';
import { OrderStatus } from './order-status.enum';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  private logger = new Logger('OrdersRepository', { timestamp: true });

  async createOrder(
    createOrderDto: CreateOrderDto,
    user: User,
  ): Promise<Order> {
    const tmp = Object.assign({} as Order, createOrderDto);
    tmp.user = user;
    tmp.status = OrderStatus.TO_PAID;
    tmp.create_time = `${new Date().getTime()}`;
    tmp.orderDetails.forEach((item) => {
      item.status = OrderStatus.TO_PAID;
    });

    const order = this.create(tmp);

    try {
      await this.save(order);
      delete order.user;
      return order;
    } catch (error) {
      this.logger.error(
        `Failed to create order with ${JSON.stringify(
          createOrderDto,
        )} for user "${user.username}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
