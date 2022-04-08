import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
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
    market_price: number;
    paid: number;
  }[];
}
