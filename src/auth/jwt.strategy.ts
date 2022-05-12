import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { Admin } from '../admins/admin.entity';
import { AdminsRepository } from './admins.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(AdminsRepository)
    private adminsRepository: AdminsRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    const user: User = await this.usersRepository
      .findOneOrFail({ id })
      .catch(() => void 0);
    const admin: Admin = await this.adminsRepository
      .findOneOrFail({ id })
      .catch(() => void 0);
    console.log(payload, admin);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
