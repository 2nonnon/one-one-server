import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { GoodsController } from './goods.controller';
import { GoodsRepository } from './goods.repository';
import { GoodsService } from './goods.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsRepository]), AuthModule],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
