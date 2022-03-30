import { GoodsPage } from './goods-page.interface';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { GetGoodsPageDto } from './dto/get-goods-page.dto';
import { Good } from './good.entity';

@EntityRepository(Good)
export class GoodsRepository extends Repository<Good> {
  private logger = new Logger('GoodsRepository', { timestamp: true });

  async getGoods(getGoodsPageDto: GetGoodsPageDto): Promise<GoodsPage> {
    const { search, current_page, page_size, category, order } =
      getGoodsPageDto;
    const query = this.createQueryBuilder('good');

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
      tmp = tmp.filter((good) => {
        good.categories.some((item) => item.name === category);
      });
    }

    if (order) {
    }

    const result = {} as GoodsPage;

    result.total = tmp.length + 1;
    result.goods = tmp.slice(
      (current_page - 1) * page_size,
      current_page * page_size,
    );

    return result;
  }
}
