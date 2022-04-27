import { Attributes } from '../attributes/attributes.inteface';
import { Sku } from './../skus/sku.entity';
import { CreateGoodDto } from './dto/create-good.dto';

export interface GoodDetail extends CreateGoodDto {
  attributes: Attributes[];
  skus: Sku[];
  banner: string[];
  detail: string[];
}
