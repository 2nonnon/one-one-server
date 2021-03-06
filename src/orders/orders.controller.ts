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
import { ConfirmOrderDto } from './dto/confirm-order.dto';
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

  // 用户获取全部订单
  @Get()
  userGetOrders(@GetUser() user: User): Promise<Order[]> {
    this.loggor.verbose(`User "${user.username}" retrieving all orders`);
    return this.ordersService.userGetOrders(user);
  }

  // 用户通过id获取订单
  @Get('/:id')
  userGetOrderById(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<Order> {
    this.loggor.verbose(
      `User "${user.username}" retrieving an order by id:${id}`,
    );
    return this.ordersService.userGetOrderById(id, user);
  }

  // 用户分页获取订单
  @Post('/page')
  userGetOrdersPage(
    @Body() getOrdersPageDto: GetOrdersPageDto,
    @GetUser() user: User,
  ): Promise<OrdersPage> {
    this.loggor.verbose(
      `retrieving orders by ${JSON.stringify(getOrdersPageDto)}`,
    );
    return this.ordersService.userGetOrdersPage(getOrdersPageDto, user);
  }

  // 用户创建订单
  @Post()
  userCreateOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ): Promise<Order> {
    this.loggor.verbose(
      `User "${user.username}" create an order with ${JSON.stringify(
        createOrderDto,
      )}`,
    );
    return this.ordersService.userCreateOrder(createOrderDto, user);
  }

  // 用户删除订单
  @Delete('/:id')
  userDeleteOrder(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.loggor.verbose(`User "${user.username}" delete an order by id: ${id}`);
    return this.ordersService.userDeleteOrder(id, user);
  }

  // 用户修改订单状态
  @Patch('/:id/status')
  userUpdateOrderStatus(
    @Param('id') id: number,
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
    return this.ordersService.userUpdateOrderStatus(id, status, user);
  }

  // 用户修改订单地址
  @Patch('/:id/receive')
  userUpdateOrderReceiveInfo(
    @Param('id') id: number,
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
    return this.ordersService.userUpdateOrderReceiveInfo(
      id,
      receive_info,
      user,
    );
  }

  // 用户确认订单
  @Patch('/:id/confirm')
  userConfirmOrder(
    @Param('id') id: number,
    @Body() confirmOrderDto: ConfirmOrderDto,
    @GetUser() user: User,
  ): Promise<Order> {
    this.loggor.verbose(
      `User "${
        user.username
      }" update an order status by id: ${id} with ${JSON.stringify(
        confirmOrderDto,
      )}`,
    );
    return this.ordersService.userConfirmOrder(id, confirmOrderDto, user);
  }

  // 兼容weixin
  // 用户修改订单状态
  @Post('/:id/status')
  wxUserUpdateOrderStatus(
    @Param('id') id: number,
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
    return this.ordersService.userUpdateOrderStatus(id, status, user);
  }

  // 用户修改订单地址
  @Post('/:id/receive')
  wxUserUpdateOrderReceiveInfo(
    @Param('id') id: number,
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
    return this.ordersService.userUpdateOrderReceiveInfo(
      id,
      receive_info,
      user,
    );
  }

  // 用户确认订单
  @Post('/:id/confirm')
  wxUserConfirmOrder(
    @Param('id') id: number,
    @Body() confirmOrderDto: ConfirmOrderDto,
    @GetUser() user: User,
  ): Promise<Order> {
    this.loggor.verbose(
      `User "${
        user.username
      }" update an order status by id: ${id} with ${JSON.stringify(
        confirmOrderDto,
      )}`,
    );
    return this.ordersService.userConfirmOrder(id, confirmOrderDto, user);
  }

  // 用户确认收货
  @Post('/:id/deal')
  wxUserDealOrder(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<Order> {
    this.loggor.verbose(
      `User "${user.username}" deal an order status by id: ${id}`,
    );
    return this.ordersService.userDealOrder(id, user);
  }

  // 管理员通过id获取订单
  @Get('/admin/:id')
  getOrderById(@Param('id') id: number, @GetUser() user: User): Promise<Order> {
    this.loggor.verbose(
      `User "${user.username}" retrieving an order by id:${id}`,
    );
    return this.ordersService.getOrderById(id);
  }

  // 管理员分页获取订单
  @Post('/admin/page')
  getOrdersPage(
    @Body() getOrdersPageDto: GetOrdersPageDto,
    @GetUser() user: User,
  ): Promise<OrdersPage> {
    this.loggor.verbose(
      `User "${user.username}" retrieving orders by ${JSON.stringify(
        getOrdersPageDto,
      )}`,
    );
    return this.ordersService.getOrdersPage(getOrdersPageDto);
  }
  // 管理员修改订单状态
  @Patch('/admin/:id/status')
  updateOrderStatus(
    @Param('id') id: number,
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
    return this.ordersService.updateOrderStatus(id, status);
  }

  // 管理员修改订单地址
  @Patch('/admin/:id/receive')
  updateOrderReceiveInfo(
    @Param('id') id: number,
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
    return this.ordersService.updateOrderReceiveInfo(id, receive_info);
  }

  // 管理员发货
  @Patch('/admin/:id/send')
  sendOrder(@Param('id') id: number): Promise<Order> {
    this.loggor.verbose(`send an order status by id: ${id}`);
    return this.ordersService.sendOrder(id);
  }
}
