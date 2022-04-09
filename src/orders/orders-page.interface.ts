import { Order } from './order.entity';

export interface OrdersPage {
  total: number;
  orders: Order[];
}
