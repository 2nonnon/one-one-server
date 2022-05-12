import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  private loggor = new Logger('UsersController', { timestamp: true });

  constructor(private usersService: UsersService) {}

  @Get()
  getUser(@GetUser() user: User): User {
    this.loggor.verbose(`User "${user.username}" retrieving user info`);
    return user;
  }

  @Get('/all')
  getAllUser(): Promise<User[]> {
    this.loggor.verbose(`retrieving all user info`);
    return this.usersService.getUsers();
  }
}
