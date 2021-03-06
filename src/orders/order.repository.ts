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

  async userCreateOrder(
    createOrderDto: CreateOrderDto,
    user: User,
  ): Promise<Order> {
    const tmp = Object.assign({}, createOrderDto) as Order;

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
        await this.userDeleteOrder(preOrder.id, user);
      }
    } catch (error) {
      this.logger.error(
        `Failed to find order with ${OrderStatus.Pre} for user "${user.username}".`,
      );
    }

    const orderInstance = this.create(tmp);

    try {
      const order = await this.save(orderInstance);
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
    orders: Order[],
  ): Promise<OrdersPage> {
    const { current_page, page_size, status } = getOrdersPageDto;

    if (status) {
      orders = orders.filter((item) => item.status === status);
    }

    const result = {} as OrdersPage;

    result.total = orders.length;
    result.orders = orders.slice(
      (current_page - 1) * page_size,
      current_page * page_size,
    );

    return result;
  }

  async userDeleteOrder(id: number, user: User) {
    // ??????????????????
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(OrderDetail, { order: id });
      await queryRunner.manager.delete(Order, { id: id, user: user });

      await queryRunner.commitTransaction();
    } catch (err) {
      //???????????????????????????????????????
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      //???????????????????????????????????????queryRunner
      await queryRunner.release();
    }
  }

  async updateOrderStatus(status: OrderStatus, order: Order): Promise<Order> {
    order.status = status;
    order.orderDetails.forEach((item) => {
      item.status = status;
    });

    return await this.save(order);
  }

  async updateOrderReceiveInfo(
    receive_info: string,
    order: Order,
  ): Promise<Order> {
    order.receive_info = receive_info;

    return await this.save(order);
  }
}
