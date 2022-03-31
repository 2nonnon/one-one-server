import { Type } from 'class-transformer';

export class CreateCartDto {
  @Type(() => Number)
  quantity: number;

  @Type(() => Number)
  skuId: number;
}
