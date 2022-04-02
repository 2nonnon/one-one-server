import { Order } from './../orders/order.entity';
import { OrderStatus } from '../orders/order-status.enum';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  goodId: number;

  @Column()
  cover_url: string;

  @Column()
  name: string;

  @Column()
  attr: string;

  @Column()
  quantity: number;

  @Column()
  paid: number;

  @Column({ enum: OrderStatus })
  status: OrderStatus;

  @Column({ nullable: true })
  deal_time: string;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;
}
