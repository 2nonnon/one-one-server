import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class UpdateGoodSpuDto {
  @Type(() => Number)
  sold: number;

  @IsString()
  sale_time: string;
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
}
