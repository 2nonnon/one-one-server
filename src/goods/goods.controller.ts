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
  Delete,
  Patch,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodDetail } from './good-detail.interface';
import { CreateGoodDto } from './dto/create-good.dto';
import { Good } from './good.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { UpdateGoodSkuDto } from './dto/update-good-sku.dto';
import { UpdateGoodSpuDto } from './dto/update-good-spu.dto';

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

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteGood(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    this.loggor.verbose(`retrieving goods by id:${id}`);
    return this.goodsService.deleteGood(id, user);
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

  @Patch('/:id/spu')
  @UseGuards(AuthGuard())
  updateGoodSpu(
    @Param('id') id: number,
    @Body() updateGoodSpuDto: UpdateGoodSpuDto,
    @GetUser() user: User,
  ): Promise<Good> {
    this.loggor.verbose(
      `User "${user.username}" update good ${id}, Good ${JSON.stringify(
        updateGoodSpuDto,
      )}`,
    );
    return this.goodsService.updateGoodSpu(id, updateGoodSpuDto, user);
  }

  @Patch('/:id/sku')
  @UseGuards(AuthGuard())
  updateGoodSku(
    @Param('id') id: number,
    @Body() updateGoodSkuDto: UpdateGoodSkuDto,
    @GetUser() user: User,
  ): Promise<Good> {
    this.loggor.verbose(
      `User "${user.username}" update good ${id}, Good ${JSON.stringify(
        updateGoodSkuDto,
      )}`,
    );
    return this.goodsService.updateGoodSku(id, updateGoodSkuDto, user);
  }
}
