import { Injectable } from '@nestjs/common';
import { User } from '../auth/user.entity';

@Injectable()
export class UsersService {
  async getUser(user: User): Promise<User> {
    return user;
  }
}
