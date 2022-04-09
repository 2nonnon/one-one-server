import { OrderStatus } from './order-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { OrdersRepository } from './order.repository';
import { GetOrdersPageDto } from './dto/get-orders-page.dto';
import { OrdersPage } from './orders-page.interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
  ) {}

  async getOrders(user: User): Promise<Order[]> {
    const orders = await this.ordersRepository.find({ user });
    return orders.filter((order) => order.status != OrderStatus.Pre);
  }

  async getOrder(id: string, user: User): Promise<Order> {
    const order = await this.ordersRepository.findOneOrFail({
      where: { id, user },
    });
    if (!order) {
      throw new NotFoundException(`order with ID "${id}" not found`);
    }
    return order;
  }

  async getOrdersPage(
    getOrdersPageDto: GetOrdersPageDto,
    user: User,
  ): Promise<OrdersPage> {
    return this.ordersRepository.getOrdersPage(getOrdersPageDto, user);
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    user: User,
  ): Promise<Order> {
    return this.ordersRepository.createOrder(createOrderDto, user);
  }

  async deleteOrder(id: string, user: User): Promise<void> {
    return this.ordersRepository.deleteOrder(id, user);
  }

  async updateOrderStatus(
    id: string,
    status: OrderStatus,
    user: User,
  ): Promise<Order> {
    const order = await this.getOrder(id, user);

    order.status = status;
    order.orderDetails.forEach((item) => {
      item.status = status;
    });
    await this.ordersRepository.save(order);

    return order;
  }

  async updateOrderReceiveInfo(
    id: string,
    receive_info: string,
    user: User,
  ): Promise<Order> {
    const order = await this.getOrder(id, user);

    order.receive_info = receive_info;

    await this.ordersRepository.save(order);

    return order;
  }
}
