import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  private appid = 'wx67c5836bd9748907';
  private secret = 'cf939ea964b8ae316b21d3905911d991';

  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private server: HttpService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { account, password } = authCredentialsDto;
    let user: User;

    try {
      user = await this.usersRepository.findOneOrFail({ account });
    } catch (error) {
      throw new NotFoundException(`用户名或密码错误`);
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const payload: JwtPayload = { account, id: user.id };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async wxSignIn(code: string): Promise<{ accessToken: string }> {
    const { openid, session } = await new Promise((resolve) => {
      this.server
        .get(
          `https://api.weixin.qq.com/sns/jscode2session?appid=${this.appid}&secret=${this.secret}&js_code=${code}&grant_type=authorization_code`,
        )
        .subscribe((value) => {
          const data = value.data;
          resolve({ openid: data.openid, session: data.session_key });
        });
    });

    const user = await this.usersRepository.createWxUser({ openid, session });

    const payload: JwtPayload = { openid, id: user.id };

    const accessToken: string = this.jwtService.sign(payload);
    return { accessToken };
  }
}
