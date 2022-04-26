import { Sku } from './../skus/sku.entity';
import { CreateGoodDto } from './dto/create-good.dto';

export interface GoodDetail extends CreateGoodDto {
  attributes: { [Propname: string]: string[] };
  skus: Sku[];
  banner: string[];
  detail: string[];
}
