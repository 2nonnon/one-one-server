import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { CreateSkuDto } from '../../skus/dto/create-sku.dto';

export class UpdateGoodSkuDto {
  @Type(() => Boolean)
  hasSku: boolean;

  @Type(() => Number)
  total_stock: number;

  @IsArray()
  skus: CreateSkuDto[];
}
