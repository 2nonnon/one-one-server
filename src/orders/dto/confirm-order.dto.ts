import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { OrderStatus } from '../order-status.enum';

export class ConfirmOrderDto {
  @IsNotEmpty()
  receive_info: string;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  remark: string;
}
