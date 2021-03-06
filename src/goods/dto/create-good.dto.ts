import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';
import { CreateSkuDto } from '../../skus/dto/create-sku.dto';

export class CreateGoodDto {
  @IsString()
  cover_url: string;

  @IsString()
  code: string;

  @Type(() => Number)
  market_price: number;

  @Type(() => Number)
  price: number;

  @Type(() => Boolean)
  hasSku: boolean;

  @IsString()
  name: string;

  @Type(() => Number)
  tag: number;

  @Type(() => Number)
  total_stock: number;

  @IsArray()
  banner: string[];

  @IsArray()
  detail: string[];

  @IsArray()
  categories: number[];

  @IsArray()
  skus: CreateSkuDto[];
}
