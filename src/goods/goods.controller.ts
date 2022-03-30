import { GoodsPage } from './goods-page.interface';
import { GetGoodsPageDto } from './dto/get-goods-page.dto';
import { Controller, Get, Logger, Param, Post, Body } from '@nestjs/common';
import { GoodsService } from './goods.service';

@Controller('goods')
export class GoodsController {
  private loggor = new Logger('goodsController', { timestamp: true });

  constructor(private goodsService: GoodsService) {}

  @Post()
  getGoods(@Body() getGoodsPageDto: GetGoodsPageDto): Promise<GoodsPage> {
    this.loggor.verbose(
      `retrieving goods by ${JSON.stringify(getGoodsPageDto)}`,
    );
    return this.goodsService.getGoods(getGoodsPageDto);
  }
}
