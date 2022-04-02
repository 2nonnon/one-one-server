import { OrderDetail } from './../order-details/order-detail.entity';
import { OrderStatus } from './order-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { OrdersRepository } from './order.repository';
import { Connection } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    private connection: Connection,
  ) {}

  async getOrders(user: User): Promise<Order[]> {
    const orders = await this.ordersRepository.find({ user });
    return orders;
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    user: User,
  ): Promise<Order> {
    return this.ordersRepository.createOrder(createOrderDto, user);
  }

  async deleteOrder(id: string, user: User): Promise<void> {
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

  async updateOrderStatus(
    id: string,
    status: OrderStatus,
    user: User,
  ): Promise<Order> {
    const order = await this.ordersRepository.findOneOrFail({
      where: { id, user },
    });

    if (!order) {
      throw new NotFoundException(`order with ID "${id}" not found`);
    }

    order.status = status;
    order.orderDetails.forEach((item) => {
      item.status = status;
    });
    await this.ordersRepository.save(order);

    return order;
  }
}
