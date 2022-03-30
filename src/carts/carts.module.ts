import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CartsController } from './carts.controller';
import { CartsRepository } from './carts.repository';
import { CartsService } from './carts.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartsRepository]), AuthModule],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
