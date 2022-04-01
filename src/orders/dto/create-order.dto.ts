import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  receive_info: string;

  @IsNotEmpty()
  @Type(() => Number)
  paid: number;

  @IsNotEmpty()
  orderDetails: {
    goodId: number;
    cover_url: string;
    name: string;
    attr: string;
    quantity: number;
    paid: number;
  }[];
}
