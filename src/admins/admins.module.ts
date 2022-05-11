import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AdminsController } from './admins.controller';
import { AdminsRepository } from './admins.repository';
import { AdminsService } from './admins.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminsRepository]), AuthModule],
  providers: [AdminsService],
  controllers: [AdminsController],
})
export class AdminsModule {}
