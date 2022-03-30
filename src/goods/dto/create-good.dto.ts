import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateGoodDto {
  @IsString()
  cover_url: string;

  @Type(() => Number)
  market_price: number;

  @Type(() => Number)
  price: number;

  @IsString()
  name: string;

  @Type(() => Number)
  tag: number;

  @Type(() => Number)
  total_stock: number;

  @IsString()
  sale_time: string;
}
