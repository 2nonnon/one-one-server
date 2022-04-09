import { OrderStatus } from './../order-status.enum';
import { Type } from 'class-transformer';
import { IsOptional, IsEnum } from 'class-validator';

export class GetOrdersPageDto {
  @Type(() => Number)
  current_page: number;

  @Type(() => Number)
  page_size: number;

  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
