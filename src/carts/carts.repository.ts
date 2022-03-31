import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';

@EntityRepository(Cart)
export class CartsRepository extends Repository<Cart> {
  private logger = new Logger('CartsRepository', { timestamp: true });

  async createCart(createCartDto: CreateCartDto, user: User): Promise<Cart> {
    const { quantity, skuId } = createCartDto;

    const cart = this.create({
      quantity,
      user,
    });

    let cartId: number;

    try {
      cartId = (await this.save(cart)).id;
      await this.createQueryBuilder()
        .relation(Cart, 'sku')
        .of(cartId)
        .set(skuId);
      return cart;
    } catch (error) {
      if (error.code === '23505') {
        await this.delete(cartId);
        const carts = await this.find({ user });
        const cart = carts.find((item) => item.sku.id === skuId);
        cart.quantity += quantity;
        await this.save(cart);
        return cart;
      } else {
        this.logger.error(
          `Failed to create cart for user "${user.username}".`,
          error.stack,
        );
        throw new InternalServerErrorException();
      }
    }
  }

  async updateCart(
    id: number,
    createCartDto: CreateCartDto,
    user: User,
  ): Promise<Cart> {
    const { quantity, skuId } = createCartDto;

    const cart = await this.findOneOrFail({ id, user });

    if (!cart) {
      throw new NotFoundException(`Cart with ID "${id}" not found`);
    } else {
      cart.quantity = quantity;
    }

    try {
      await this.save(cart);
      await this.createQueryBuilder()
        .relation(Cart, 'sku')
        .of(cart.id)
        .set(skuId);
      return cart;
    } catch (error) {
      this.logger.error(
        `Failed to update cart by ${id} with ${JSON.stringify(
          createCartDto,
        )} for user "${user.username}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
