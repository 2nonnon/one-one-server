import { OrderDetail } from './../order-details/order-detail.entity';
import { User } from 'src/auth/user.entity';
import { OrderStatus } from './order-status.enum';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  receive_info: string;

  @Column()
  paid: number;

  @Column({ enum: OrderStatus })
  status: OrderStatus;

  @Column()
  create_time: string;

  @Column({ nullable: true })
  paid_time: string;

  @Column({ nullable: true })
  send_time: string;

  @Column({ nullable: true })
  deal_time: string;

  @OneToMany(() => OrderDetail, (OrderDetail) => OrderDetail.order, {
    eager: true,
    cascade: true,
  })
  orderDetails: OrderDetail[];

  @ManyToOne(() => User)
  user: User;
}
