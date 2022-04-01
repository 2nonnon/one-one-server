import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  private loggor = new Logger('OrdersController', { timestamp: true });

  constructor(private ordersService: OrdersService) {}

  @Get()
  getOrders(@GetUser() user: User): Promise<Order[]> {
    this.loggor.verbose(`User "${user.username}" retrieving all orders`);
    return this.ordersService.getOrders(user);
  }

  @Post()
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto, user);
  }
}
