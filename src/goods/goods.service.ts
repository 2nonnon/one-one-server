import { GoodsPage } from './goods-page.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetGoodsPageDto } from './dto/get-goods-page.dto';
import { GoodsRepository } from './goods.repository';
import { GoodDetail } from './good-detail.interface';

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
}
