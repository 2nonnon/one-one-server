import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminsRepository } from './admins.repository';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(AdminsRepository)
    private adminsRepository: AdminsRepository,
  ) {}

  async getAdmins(): Promise<Admin[]> {
    return await this.adminsRepository.find();
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminsRepository.createAdmin(createAdminDto);
  }

  async deleteAdmin(id: string): Promise<void> {
    this.adminsRepository.delete(id);
  }

  async updateAdmin(
    id: string,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    return this.adminsRepository.updateAdmin(id, updateAdminDto);
  }
}
