import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { GetGoodsPageDto } from './dto/get-goods-page.dto';
import { Good } from './good.entity';

@EntityRepository(Good)
export class GoodsRepository extends Repository<Good> {
  private logger = new Logger('GoodsRepository', { timestamp: true });

  async getGoods(getGoodsPageDto: GetGoodsPageDto): Promise<[]> {
    return [];
  }
}
