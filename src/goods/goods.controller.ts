import { GoodsPage } from './goods-page.interface';
import { GetGoodsPageDto } from './dto/get-goods-page.dto';
import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodDetail } from './good-detail.interface';
import { CreateGoodDto } from './dto/create-good.dto';
import { Good } from './good.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('goods')
export class GoodsController {
  private loggor = new Logger('goodsController', { timestamp: true });

  constructor(private goodsService: GoodsService) {}

  @Get('/detail/:id')
  getGoodDetailById(@Param('id') id: string): Promise<GoodDetail> {
    this.loggor.verbose(`retrieving goods by id:${id}`);
    return this.goodsService.getGoodDetailById(id);
  }

  @Post('/page')
  getGoods(@Body() getGoodsPageDto: GetGoodsPageDto): Promise<GoodsPage> {
    this.loggor.verbose(
      `retrieving goods by ${JSON.stringify(getGoodsPageDto)}`,
    );
    return this.goodsService.getGoods(getGoodsPageDto);
  }

  @Post('/create')
  @UseGuards(AuthGuard())
  createGood(
    @Body() createGoodDto: CreateGoodDto,
    @GetUser() user: User,
  ): Promise<Good> {
    this.loggor.verbose(`retrieving goods by ${JSON.stringify(createGoodDto)}`);
    return this.goodsService.createGood(createGoodDto, user);
  }
}
