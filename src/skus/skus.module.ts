import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SkusController } from './skus.controller';
import { SkusRepository } from './skus.repository';
import { SkusService } from './skus.service';

@Module({
  imports: [TypeOrmModule.forFeature([SkusRepository]), AuthModule],
  controllers: [SkusController],
  providers: [SkusService],
})
export class SkusModule {}
