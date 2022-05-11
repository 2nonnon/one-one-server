import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Admin } from './admin.entity';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@EntityRepository(Admin)
export class AdminsRepository extends Repository<Admin> {
  private logger = new Logger('AdminsRepository', { timestamp: true });

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { password } = createAdminDto;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = this.create(Object.assign(createAdminDto, { password: hash }));

    try {
      return await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Account already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateAdmin(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    const { password } = updateAdminDto;
    const admin = await this.findOneOrFail(id);

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      Object.assign(admin, updateAdminDto, { password: hash });
    } else {
      Object.assign(admin, updateAdminDto);
    }

    try {
      return await this.save(admin);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Account already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
