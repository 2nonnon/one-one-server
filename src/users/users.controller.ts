import {
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  UseGuards,
} from '@nestjs/common';
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

  // 用户收藏商品
  @Get('/:id/collection')
  addCollection(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<string> {
    this.loggor.verbose(`User "${user.username}" collect good by id: ${id}`);
    return this.usersService.addCollection(id, user);
  }

  // 用户取消收藏商品
  @Delete('/:id/collection')
  deleteCollection(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.loggor.verbose(
      `User "${user.username}" delete collection by id: ${id}`,
    );
    return this.usersService.deleteCollection(id, user);
  }
}
