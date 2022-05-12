import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Admin } from './admin.entity';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admins')
@UseGuards(AuthGuard())
export class AdminsController {
  private loggor = new Logger('AdminsController', { timestamp: true });

  constructor(private adminsService: AdminsService) {}

  @Get()
  getAdmins(): Promise<Admin[]> {
    this.loggor.verbose(`retrieving all admins`);
    return this.adminsService.getAdmins();
  }

  @Post()
  createAdmin(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    this.loggor.verbose(
      ` create a admin, Admin ${JSON.stringify(createAdminDto)}`,
    );
    return this.adminsService.createAdmin(createAdminDto);
  }

  @Delete('/:id')
  deleteAdmin(@Param('id') id: string): Promise<void> {
    this.loggor.verbose(`detele admin ${id}`);
    return this.adminsService.deleteAdmin(id);
  }

  @Patch('/:id')
  updateAdmin(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    this.loggor.verbose(
      `update admin ${id}, Admin ${JSON.stringify(updateAdminDto)}`,
    );
    return this.adminsService.updateAdmin(id, updateAdminDto);
  }
}
