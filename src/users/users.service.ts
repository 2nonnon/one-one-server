import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async addCollection(id: string, user: User): Promise<string> {
    const collection = user.collection;
    if (!collection) user.collection = [id];
    else {
      collection.push(id);
      user.collection = Array.from(new Set(collection));
    }
    const up = await this.usersRepository.save(user);
    console.log(up);
    return id;
  }

  // 用户取消收藏商品
  async deleteCollection(id: string, user: User): Promise<void> {
    const collection = user.collection;
    const index = collection.indexOf(id);
    if (index >= 0) {
      collection.splice(index, 1);
      await this.usersRepository.save(user);
    } else {
      throw new NotFoundException(
        `good with ID "${id}" not found in user collection`,
      );
    }
  }
}
