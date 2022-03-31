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
import { Cart } from './cart.entity';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('carts')
@UseGuards(AuthGuard())
export class CartsController {
  private loggor = new Logger('CartsController', { timestamp: true });

  constructor(private cartsService: CartsService) {}

  @Get()
  getCarts(@GetUser() user: User): Promise<Cart[]> {
    this.loggor.verbose(`User "${user.username}" retrieving all Carts`);
    return this.cartsService.getCarts(user);
  }

  @Get('/total')
  getTotal(@GetUser() user: User): Promise<number> {
    this.loggor.verbose(`User "${user.username}" retrieving Carts total`);
    return this.cartsService.getTotal(user);
  }

  @Post()
  createCart(
    @Body() createCartDto: CreateCartDto,
    @GetUser() user: User,
  ): Promise<Cart> {
    this.loggor.verbose(
      `User "${user.username}" creating a new Cart. Cart ${JSON.stringify(
        createCartDto,
      )}`,
    );
    return this.cartsService.createCart(createCartDto, user);
  }

  @Delete('/:id')
  deleteCart(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    this.loggor.verbose(`User "${user.username}" delete cart. id: ${id}`);
    return this.cartsService.deleteCart(id, user);
  }

  @Patch('/:id')
  updateCart(
    @Param('id') id: number,
    @Body() createCartDto: CreateCartDto,
    @GetUser() user: User,
  ): Promise<Cart> {
    this.loggor.verbose(
      `User "${user.username}" update cart. id: ${id} update: ${JSON.stringify(
        createCartDto,
      )}`,
    );
    return this.cartsService.updateCart(id, createCartDto, user);
  }
}
