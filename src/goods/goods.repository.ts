import { GoodsPage } from './goods-page.interface';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { GetGoodsPageDto } from './dto/get-goods-page.dto';
import { Good } from './good.entity';
import { GoodDetail } from './good-detail.interface';

@EntityRepository(Good)
export class GoodsRepository extends Repository<Good> {
  private logger = new Logger('GoodsRepository', { timestamp: true });

  async getGoods(getGoodsPageDto: GetGoodsPageDto): Promise<GoodsPage> {
    const { search, current_page, page_size, category, order } =
      getGoodsPageDto;
    const query = this.createQueryBuilder('good').leftJoinAndSelect(
      'good.categories',
      'category',
    );

    if (search) {
      query.andWhere('(LOWER(good.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    let tmp: Good[];

    try {
      tmp = await query.getMany();
    } catch (error) {
      this.logger.error(`Failed to get goods`, error.stack);
      throw new InternalServerErrorException();
    }

    if (category) {
      tmp = tmp.filter((good) =>
        good.categories.some((item) => item.name === category),
      );
    }

    if (order) {
    }

    const result = {} as GoodsPage;

    result.total = tmp.length;
    result.goods = tmp.slice(
      (current_page - 1) * page_size,
      current_page * page_size,
    );

    return result;
  }

  async getGoodDetailById(id: number): Promise<GoodDetail> {
    const good = await this.findOneOrFail(id);
    const skus = good.skus;
    const attributes = {};
    if (skus.length > 0) {
      const map = new Map();
      skus.forEach((sku) => {
        sku.attributes.forEach((attr) => {
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
