import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

interface IAttribute {
  id: number;
  name: string;
  parentId: number;
}

interface CreateSkuDto {
  name: string;
  img_url: string;
  market_price: number;
  price: number;
  stock: number;
  attributes: IAttribute[];
}

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
