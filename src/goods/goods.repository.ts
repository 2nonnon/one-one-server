import { Sku } from './../skus/sku.entity';
import { Category } from './../categories/category.entity';
import { Sort } from './sort.enum';
import { GoodsPage } from './goods-page.interface';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { GetGoodsPageDto } from './dto/get-goods-page.dto';
import { Good } from './good.entity';
import { GoodDetail } from './good-detail.interface';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodSkuDto } from './dto/update-good-sku.dto';
import { UpdateGoodSpuDto } from './dto/update-good-spu.dto';

interface Node {
  id: number;
  name: string;
  parentId: number;
}

interface TreeNode extends Node {
  children: TreeNode[];
}

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

  private arrayToTree = (arr: Node[]): TreeNode[] => {
    const map = new Map<number, TreeNode>();
    arr.forEach((item: TreeNode) => {
      if (item.parentId === 0) {
        item.children = [];
        map.set(item.id, item);
      }
    });
    arr.forEach((item: TreeNode) => {
      if (item.parentId !== 0) {
        map.get(item.parentId).children.push(item);
      }
    });
    return Array.from(map.values());
  };

  constructor() {
    super();
  }

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
    const queryRunner = this.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const good = await queryRunner.manager.findOneOrFail(Good, id, {
        relations: ['categories', 'skus', 'skus.attributes'],
      });

      const skus = good.skus;
      const attrSet: Node[] = [];
      skus.forEach((sku) => {
        sku.attributes.forEach((attr) => {
          if (attrSet.every((_) => _.id !== attr.id)) {
            attrSet.push(attr);
          }
        });
      });

      const attributes = this.arrayToTree(attrSet);

      const goodDetail = Object.assign({} as GoodDetail, good);
      goodDetail.attributes = attributes;

      await queryRunner.commitTransaction();

      return goodDetail;
    } catch (err) {
      //???????????????????????????????????????
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      //???????????????????????????????????????queryRunner
      await queryRunner.release();
    }
  }

  async deleteGood(id: string): Promise<void> {
    // ??????????????????
    const queryRunner = this.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(Sku, { good: id });
      await queryRunner.manager.delete(Good, { id: id });

      await queryRunner.commitTransaction();
    } catch (err) {
      //???????????????????????????????????????
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      //???????????????????????????????????????queryRunner
      await queryRunner.release();
    }
  }

  async createGood(createGoodDto: CreateGoodDto): Promise<Good> {
    const queryRunner = this.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const categories = await queryRunner.manager.findByIds(
        Category,
        createGoodDto.categories,
      );

      const skus = createGoodDto.skus.map((item) =>
        queryRunner.manager.create(Sku, item),
      );

      const goodData = Object.assign(createGoodDto, { categories, skus });

      const goodInstance = queryRunner.manager.create(Good, goodData);

      const good = await queryRunner.manager.save(goodInstance);

      await queryRunner.commitTransaction();

      return good;
    } catch (err) {
      //???????????????????????????????????????
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      //???????????????????????????????????????queryRunner
      await queryRunner.release();
    }
  }

  async updateGoodSpu(
    id: number,
    updateGoodSpuDto: UpdateGoodSpuDto,
  ): Promise<Good> {
    const queryRunner = this.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const preGood = await queryRunner.manager.findOneOrFail(Good, id);

      const categories = await queryRunner.manager.findByIds(
        Category,
        updateGoodSpuDto.categories,
      );

      const good = Object.assign(preGood, updateGoodSpuDto, {
        categories,
      }) as Good;

      const goodInstance = queryRunner.manager.create(Good, good);

      const newGood = await queryRunner.manager.save(goodInstance);

      await queryRunner.commitTransaction();

      return newGood;
    } catch (err) {
      //???????????????????????????????????????
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      //???????????????????????????????????????queryRunner
      await queryRunner.release();
    }
  }

  async updateGoodSku(
    id: number,
    updateGoodSkuDto: UpdateGoodSkuDto,
  ): Promise<Good> {
    const queryRunner = this.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const preGood = await queryRunner.manager.findOneOrFail(Good, id);

      const skus = updateGoodSkuDto.skus.map((item) =>
        queryRunner.manager.create(Sku, item),
      );

      const good = Object.assign(preGood, updateGoodSkuDto, { skus }) as Good;

      const goodInstance = queryRunner.manager.create(Good, good);

      const newGood = await queryRunner.manager.save(goodInstance);

      await queryRunner.commitTransaction();

      return newGood;
    } catch (err) {
      //???????????????????????????????????????
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      //???????????????????????????????????????queryRunner
      await queryRunner.release();
    }
  }
}
