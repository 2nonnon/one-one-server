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

  async getOrders(): Promise<Order[]> {
    const orders = await this.ordersRepository.find();
    return orders.filter((order) => order.status != OrderStatus.Pre);
  }

  async userGetOrders(user: User): Promise<Order[]> {
    const orders = await this.ordersRepository.find({ user });
    return orders.filter((order) => order.status != OrderStatus.Pre);
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOneOrFail({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`order with ID "${id}" not found`);
    }
    return order;
  }

  async userGetOrderById(id: string, user: User): Promise<Order> {
    const order = await this.ordersRepository.findOneOrFail({
      where: { id, user },
    });
    if (!order) {
      throw new NotFoundException(`order with ID "${id}" not found`);
    }
    return order;
  }

  async getOrdersPage(getOrdersPageDto: GetOrdersPageDto): Promise<OrdersPage> {
    const orders = await this.getOrders();
    return this.ordersRepository.getOrdersPage(getOrdersPageDto, orders);
  }

  async userGetOrdersPage(
    getOrdersPageDto: GetOrdersPageDto,
    user: User,
  ): Promise<OrdersPage> {
    const orders = await this.userGetOrders(user);
    return this.ordersRepository.getOrdersPage(getOrdersPageDto, orders);
  }

  async userCreateOrder(
    createOrderDto: CreateOrderDto,
    user: User,
  ): Promise<Order> {
    return this.ordersRepository.userCreateOrder(createOrderDto, user);
  }

  async userDeleteOrder(id: string, user: User): Promise<void> {
    return this.ordersRepository.userDeleteOrder(id, user);
  }

  async userUpdateOrderStatus(
    id: string,
    status: OrderStatus,
    user: User,
  ): Promise<Order> {
    const order = await this.userGetOrderById(id, user);

    return this.ordersRepository.updateOrderStatus(status, order);
  }

  async userUpdateOrderReceiveInfo(
    id: string,
    receive_info: string,
    user: User,
  ): Promise<Order> {
    const order = await this.userGetOrderById(id, user);

    return this.ordersRepository.updateOrderReceiveInfo(receive_info, order);
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.getOrderById(id);

    return this.ordersRepository.updateOrderStatus(status, order);
  }

  async updateOrderReceiveInfo(
    id: string,
    receive_info: string,
  ): Promise<Order> {
    const order = await this.getOrderById(id);

    return this.ordersRepository.updateOrderReceiveInfo(receive_info, order);
  }
}
