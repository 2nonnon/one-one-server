import { WxSignIn } from './wxSignIn.interface';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { account, password } = authCredentialsDto;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = this.create({ account, password: hash });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Account already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async createWxUser(wxSignIn: WxSignIn): Promise<User> {
    const { openid, session } = wxSignIn;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(session, salt);

    const user = this.create({ openid, session: hash });

    try {
      return await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        const user = await this.findOneOrFail({ openid });
        user.session = hash;
        return await this.save(user);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
