import { CreateGoodDto } from './dto/create-good.dto';
export interface GoodsPage {
  total: number;
  goods: CreateGoodDto[];
}
