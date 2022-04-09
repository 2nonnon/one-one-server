import { Sort } from './../sort.enum';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsEnum } from 'class-validator';

export class GetGoodsPageDto {
  @IsOptional()
  @IsString()
  search?: string;

  @Type(() => Number)
  current_page: number;

  @Type(() => Number)
  page_size: number;

  @IsOptional()
  @Type(() => Number)
  category?: number;

  @IsOptional()
  @IsEnum(Sort)
  sort?: Sort;
}
