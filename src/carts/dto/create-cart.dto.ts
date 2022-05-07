import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCartDto {
  @Type(() => Number)
  quantity: number;

  @Type(() => Number)
  skuId: number;

  @Type(() => Number)
  goodId: number;

  @IsString()
  goodName: string;
}
