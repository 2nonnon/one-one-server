import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class GetGoodsPageDto {
  @IsOptional()
  @IsString()
  search?: string;

  @Type(() => Number)
  current_page: number;

  @Type(() => Number)
  page_size: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  order?: string;
}
