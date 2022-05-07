import { Type } from 'class-transformer';

export class UpdateQuantityDto {
  @Type(() => Number)
  quantity: number;
}
