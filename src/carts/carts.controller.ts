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
import { DeleteCartsByIdsDto } from './dto/delete-carts-by-ids.dto';

@Controller('carts')
@UseGuards(AuthGuard())
export class CartsController {
  private loggor = new Logger('CartsController', { timestamp: true });

  constructor(private cartsService: CartsService) {}

  @Get()
  getCarts(@GetUser() user: User): Promise<Cart[]> {
    console.log(user);
    this.loggor.verbose(`User "${user.id}" retrieving all Carts`);
    return this.cartsService.getCarts(user);
  }

  @Get('/total')
  getTotal(@GetUser() user: User): Promise<number> {
    this.loggor.verbose(`User "${user.id}" retrieving Carts total`);
    return this.cartsService.getTotal(user);
  }

  @Post()
  createCart(
    @Body() createCartDto: CreateCartDto,
    @GetUser() user: User,
  ): Promise<Cart> {
    this.loggor.verbose(
      `User "${user.id}" creating a new Cart. Cart ${JSON.stringify(
        createCartDto,
      )}`,
    );
    return this.cartsService.createCart(createCartDto, user);
  }

  @Delete('/:id')
  deleteCart(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    this.loggor.verbose(`User "${user.id}" delete cart. id: ${id}`);
    return this.cartsService.deleteCart(id, user);
  }

  @Post('/delete/ids')
  deleteCartByIds(
    @Body() deleteCartsByIdsDto: DeleteCartsByIdsDto,
    @GetUser() user: User,
  ): Promise<void> {
    this.loggor.verbose(
      `User "${user.id}" delete cart. ids: ${JSON.stringify(
        deleteCartsByIdsDto,
      )}`,
    );
    return this.cartsService.deleteCartByIds(deleteCartsByIdsDto, user);
  }

  @Patch('/:id')
  updateCart(
    @Param('id') id: number,
    @Body() createCartDto: CreateCartDto,
    @GetUser() user: User,
  ): Promise<Cart> {
    this.loggor.verbose(
      `User "${user.id}" update cart. id: ${id} update: ${JSON.stringify(
        createCartDto,
      )}`,
    );
    return this.cartsService.updateCart(id, createCartDto, user);
  }

  // 兼容微信
  @Post('/:id')
  wxUpdateCart(
    @Param('id') id: number,
    @Body() createCartDto: CreateCartDto,
    @GetUser() user: User,
  ): Promise<Cart> {
    this.loggor.verbose(
      `User "${user.id}" update cart. id: ${id} update: ${JSON.stringify(
        createCartDto,
      )}`,
    );
    return this.cartsService.updateCart(id, createCartDto, user);
  }
}
