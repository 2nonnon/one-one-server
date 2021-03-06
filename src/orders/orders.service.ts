import { OrderStatus } from './order-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { OrdersRepository } from './order.repository';
import { GetOrdersPageDto } from './dto/get-orders-page.dto';
import { OrdersPage } from './orders-page.interface';
import { ConfirmOrderDto } from './dto/confirm-order.dto';

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

  async getOrderById(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOneOrFail({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`order with ID "${id}" not found`);
    }
    return order;
  }

  async userGetOrderById(id: number, user: User): Promise<Order> {
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

  async userConfirmOrder(
    id: number,
    confirmOrderDto: ConfirmOrderDto,
    user: User,
  ): Promise<Order> {
    const { status, receive_info, remark } = confirmOrderDto;
    const order = await this.userGetOrderById(id, user);
    order.paid_time = `${Date.now()}`;
    if (remark) order.remark = remark;
    order.receive_info = receive_info;

    return this.ordersRepository.updateOrderStatus(status, order);
  }

  async userDealOrder(id: number, user: User): Promise<Order> {
    const order = await this.userGetOrderById(id, user);
    order.deal_time = `${Date.now()}`;

    return this.ordersRepository.updateOrderStatus(
      OrderStatus.HAS_CLOSED,
      order,
    );
  }

  async userDeleteOrder(id: number, user: User): Promise<void> {
    return this.ordersRepository.userDeleteOrder(id, user);
  }

  async userUpdateOrderStatus(
    id: number,
    status: OrderStatus,
    user: User,
  ): Promise<Order> {
    const order = await this.userGetOrderById(id, user);

    return this.ordersRepository.updateOrderStatus(status, order);
  }

  async userUpdateOrderReceiveInfo(
    id: number,
    receive_info: string,
    user: User,
  ): Promise<Order> {
    const order = await this.userGetOrderById(id, user);

    return this.ordersRepository.updateOrderReceiveInfo(receive_info, order);
  }

  async userUpdateOrderRemark(
    id: number,
    remark: string,
    user: User,
  ): Promise<Order> {
    const order = await this.userGetOrderById(id, user);
    order.remark = remark;
    return this.ordersRepository.save(order);
  }

  async updateOrderStatus(id: number, status: OrderStatus): Promise<Order> {
    const order = await this.getOrderById(id);

    return this.ordersRepository.updateOrderStatus(status, order);
  }

  async updateOrderReceiveInfo(
    id: number,
    receive_info: string,
  ): Promise<Order> {
    const order = await this.getOrderById(id);

    return this.ordersRepository.updateOrderReceiveInfo(receive_info, order);
  }

  async updateOrderRemark(id: number, remark: string): Promise<Order> {
    const order = await this.getOrderById(id);
    order.remark = remark;
    return this.ordersRepository.save(order);
  }

  async sendOrder(id: number): Promise<Order> {
    const order = await this.getOrderById(id);
    order.send_time = `${Date.now()}`;

    return this.ordersRepository.updateOrderStatus(OrderStatus.TO_DEAL, order);
  }
}
