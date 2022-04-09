import { Order } from './order.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from '../auth/user.entity';
import { OrderStatus } from './order-status.enum';
import { OrderDetail } from '../order-details/order-detail.entity';
import { GetOrdersPageDto } from './dto/get-orders-page.dto';
import { OrdersPage } from './orders-page.interface';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  private logger = new Logger('OrdersRepository', { timestamp: true });

  constructor(private connection: Connection) {
    super();
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    user: User,
  ): Promise<Order> {
    const tmp = Object.assign({} as Order, createOrderDto);

    tmp.user = user;
    tmp.status = OrderStatus.Pre;
    tmp.create_time = `${new Date().getTime()}`;
    tmp.orderDetails.forEach((item) => {
      item.status = OrderStatus.Pre;
    });

    try {
      const preOrder = await this.findOneOrFail({
        user,
        status: OrderStatus.Pre,
      });
      if (preOrder) {
        await this.deleteOrder(preOrder.id, user);
      }
    } catch (error) {
      this.logger.error(
        `Failed to find order with ${OrderStatus.Pre} for user "${user.username}".`,
      );
    }

    // const address =
    //   user.addresses?.find((item) => item.isDefault === 1) ??
    //   user.addresses[0] ??
    //   '';

    // tmp.receive_info =
    //   address && `${address.receiver} ${address.mobile} ${address.destination}`;

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

  async getOrdersPage(
    getOrdersPageDto: GetOrdersPageDto,
    user: User,
  ): Promise<OrdersPage> {
    const { current_page, page_size, status } = getOrdersPageDto;
    let tmp: Order[];
    try {
      tmp = await this.find({ user });
    } catch (error) {
      this.logger.error(`Failed to get orders`, error.stack);
      throw new InternalServerErrorException();
    }

    if (status) {
      tmp = tmp.filter((item) => item.status === status);
    }

    const result = {} as OrdersPage;

    result.total = tmp.length;
    result.orders = tmp.slice(
      (current_page - 1) * page_size,
      current_page * page_size,
    );

    return result;
  }

  async deleteOrder(id: string, user: User) {
    // 创建一个事务
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(OrderDetail, { order: id });
      await queryRunner.manager.delete(Order, { id: id, user: user });

      await queryRunner.commitTransaction();
    } catch (err) {
      //如果遇到错误，可以回滚事务
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      //你需要手动实例化并部署一个queryRunner
      await queryRunner.release();
    }
  }
}
