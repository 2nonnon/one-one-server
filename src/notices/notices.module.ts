import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { NoticesController } from './notices.controller';
import { NoticesRepository } from './notices.repository';
import { NoticesService } from './notices.service';

@Module({
  imports: [TypeOrmModule.forFeature([NoticesRepository]), AuthModule],
  controllers: [NoticesController],
  providers: [NoticesService],
})
export class NoticesModule {}
