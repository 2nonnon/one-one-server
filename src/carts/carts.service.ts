import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Cart } from './cart.entity';
import { CartsRepository } from './carts.repository';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(CartsRepository)
    private cartsRepository: CartsRepository,
  ) {}

  async getCarts(user: User): Promise<Cart[]> {
    const carts = this.cartsRepository.find({ user });
    return carts;
  }

  async getTotal(user: User): Promise<number> {
    const total = this.cartsRepository.count({ user });
    return total;
  }

  async createCart(createCartDto: CreateCartDto, user: User): Promise<Cart> {
    return this.cartsRepository.createCart(createCartDto, user);
  }

  async deleteCart(id: number, user: User): Promise<void> {
    const result = await this.cartsRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Cart with ID "${id}" not found`);
    }
  }

  async updateCart(
    id: number,
    createCartDto: CreateCartDto,
    user: User,
  ): Promise<Cart> {
    return this.cartsRepository.updateCart(id, createCartDto, user);
  }
}
