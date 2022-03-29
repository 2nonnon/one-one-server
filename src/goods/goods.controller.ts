import { GetGoodsPageDto } from './dto/get-goods-page.dto';
import { Controller, Get, Logger, Param } from '@nestjs/common';
import { GoodsService } from './goods.service';

@Controller('goods')
export class GoodsController {
  private loggor = new Logger('goodsController', { timestamp: true });

  constructor(private goodsService: GoodsService) {}

  @Get()
  getGoods(@Param() getGoodsPageDto: GetGoodsPageDto): Promise<[]> {
    this.loggor.verbose(`retrieving goods by ${getGoodsPageDto}`);
    return this.goodsService.getGoods(getGoodsPageDto);
  }
}
