import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersPageDto } from './dto/get-orders-page.dto';
import { UpdateOrderReceiveInfoDto } from './dto/update-order-receive-info.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Order } from './order.entity';
import { OrdersPage } from './orders-page.interface';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  private loggor = new Logger('OrdersController', { timestamp: true });

  constructor(private ordersService: OrdersService) {}

  // 获取用户全部订单
  @Get()
  getOrders(@GetUser() user: User): Promise<Order[]> {
    this.loggor.verbose(`User "${user.username}" retrieving all orders`);
    return this.ordersService.getOrders(user);
  }

  // 通过id获取订单
  @Get('/:id')
  getOrder(@Param('id') id: string, @GetUser() user: User): Promise<Order> {
    this.loggor.verbose(
      `User "${user.username}" retrieving an order by id:${id}`,
    );
    return this.ordersService.getOrder(id, user);
  }

  @Post('/page')
  getOrdersPage(
    @Body() getOrdersPageDto: GetOrdersPageDto,
    @GetUser() user: User,
  ): Promise<OrdersPage> {
    this.loggor.verbose(
      `retrieving orders by ${JSON.stringify(getOrdersPageDto)}`,
    );
    return this.ordersService.getOrdersPage(getOrdersPageDto, user);
  }

  // 创建订单
  @Post()
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ): Promise<Order> {
    this.loggor.verbose(
      `User "${user.username}" create an order with ${JSON.stringify(
        createOrderDto,
      )}`,
    );
    return this.ordersService.createOrder(createOrderDto, user);
  }

  // 删除订单
  @Delete('/:id')
  deleteOrder(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    this.loggor.verbose(`User "${user.username}" delete an order by id: ${id}`);
    return this.ordersService.deleteOrder(id, user);
  }

  // 修改订单状态
  @Patch('/:id/status')
  updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @GetUser() user: User,
  ): Promise<Order> {
    this.loggor.verbose(
      `User "${
        user.username
      }" update an order status by id: ${id} with ${JSON.stringify(
        updateOrderStatusDto,
      )}`,
    );
    const { status } = updateOrderStatusDto;
    return this.ordersService.updateOrderStatus(id, status, user);
  }

  // 修改订单地址
  @Patch('/:id/receive')
  updateOrderReceiveInfo(
    @Param('id') id: string,
    @Body() updateOrderReceiveInfoDto: UpdateOrderReceiveInfoDto,
    @GetUser() user: User,
  ): Promise<Order> {
    this.loggor.verbose(
      `User "${
        user.username
      }" update an order status by id: ${id} with ${JSON.stringify(
        updateOrderReceiveInfoDto,
      )}`,
    );
    const { receive_info } = updateOrderReceiveInfoDto;
    return this.ordersService.updateOrderReceiveInfo(id, receive_info, user);
  }

  @Patch('/:id')
  updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderReceiveInfoDto & UpdateOrderStatusDto,
    @GetUser() user: User,
  ): Promise<Order> {
    this.loggor.verbose(
      `User "${
        user.username
      }" update an order status by id: ${id} with ${JSON.stringify(
        updateOrderDto,
      )}`,
    );
    const { receive_info, status } = updateOrderDto;
    this.ordersService.updateOrderStatus(id, status, user);
    return this.ordersService.updateOrderReceiveInfo(id, receive_info, user);
  }
}
