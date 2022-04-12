import { Sort } from './sort.enum';
import { GoodsPage } from './goods-page.interface';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { GetGoodsPageDto } from './dto/get-goods-page.dto';
import { Good } from './good.entity';
import { GoodDetail } from './good-detail.interface';

@EntityRepository(Good)
export class GoodsRepository extends Repository<Good> {
  private logger = new Logger('GoodsRepository', { timestamp: true });
  private sortFuc = {
    [Sort.TIME]: (arr: Good[]) => {
      return arr.sort((a, b) => parseInt(b.sale_time) - parseInt(a.sale_time));
    },
    [Sort.SOLED]: (arr: Good[]) => {
      return arr.sort((a, b) => b.sold - a.sold);
    },
    [Sort.PRICE]: (arr: Good[]) => {
      return arr.sort((a, b) => a.market_price - b.market_price);
    },
    [Sort.PRICE_DES]: (arr: Good[]) => {
      return arr.sort((a, b) => b.market_price - a.market_price);
    },
  };

  async getGoods(getGoodsPageDto: GetGoodsPageDto): Promise<GoodsPage> {
    const { search, current_page, page_size, category, sort } = getGoodsPageDto;
    const query = this.createQueryBuilder('good').leftJoinAndSelect(
      'good.categories',
      'category',
    );

    let tmp: Good[];

    try {
      tmp = await query.getMany();
    } catch (error) {
      this.logger.error(`Failed to get goods`, error.stack);
      throw new InternalServerErrorException();
    }

    if (search) {
      tmp = tmp.filter((good) => good.name.includes(search));
    }

    if (category) {
      tmp = tmp.filter((good) =>
        good.categories.some((item) => item.id === category),
      );
    }

    if (sort) {
      tmp = this.sortFuc[sort](tmp);
    }

    const result = {} as GoodsPage;

    result.total = tmp.length;
    result.goods = tmp.slice(
      (current_page - 1) * page_size,
      current_page * page_size,
    );

    return result;
  }

  async getGoodDetailById(id: string): Promise<GoodDetail> {
    const query = this.createQueryBuilder('good');
    query.where({ id }).leftJoinAndSelect('good.skus', 'sku');

    const [good] = await query.getMany();
    const skus = good.skus;
    const attributes = {};
    if (skus?.length > 0) {
      const map = new Map();
      skus.forEach((sku) => {
        sku.attributes?.forEach((attr) => {
          if (attr.parentId === 0 && !attributes[attr.name]) {
            attributes[attr.name] = [];
            map.set(attr.id, attr.name);
          } else if (attr.parentId !== 0) {
            attributes[map.get(attr.parentId)].push(attr.name);
          }
        });
      });
    }
    const goodDetail = Object.assign({} as GoodDetail, good);
    goodDetail.attributes = attributes;
    return goodDetail;
  }
}
