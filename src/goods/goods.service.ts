import { GoodsPage } from './goods-page.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetGoodsPageDto } from './dto/get-goods-page.dto';
import { GoodsRepository } from './goods.repository';
import { GoodDetail } from './good-detail.interface';
import { CreateGoodDto } from './dto/create-good.dto';
import { User } from '../auth/user.entity';
import { Good } from './good.entity';
import { UpdateGoodSkuDto } from './dto/update-good-sku.dto';
import { UpdateGoodSpuDto } from './dto/update-good-spu.dto';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodsRepository)
    private goodsRepository: GoodsRepository,
  ) {}

  async getGoodDetailById(id: string): Promise<GoodDetail> {
    return this.goodsRepository.getGoodDetailById(id);
  }

  async getGoods(getGoodsPageDto: GetGoodsPageDto): Promise<GoodsPage> {
    return this.goodsRepository.getGoods(getGoodsPageDto);
  }

  async deleteGood(id: string, user: User): Promise<void> {
    return this.goodsRepository.deleteGood(id, user);
  }

  async createGood(createGoodDto: CreateGoodDto, user: User): Promise<Good> {
    return this.goodsRepository.createGood(createGoodDto, user);
  }

  async updateGoodSpu(
    id: number,
    updateGoodSpuDto: UpdateGoodSpuDto,
    user: User,
  ): Promise<Good> {
    return this.goodsRepository.updateGoodSpu(id, updateGoodSpuDto, user);
  }

  async updateGoodSku(
    id: number,
    updateGoodSkuDto: UpdateGoodSkuDto,
    user: User,
  ): Promise<Good> {
    return this.goodsRepository.updateGoodSku(id, updateGoodSkuDto, user);
  }
}
