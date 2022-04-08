import { OrderDetail } from './../order-details/order-detail.entity';
import { User } from 'src/auth/user.entity';
import { OrderStatus } from './order-status.enum';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ nullable: true })
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
    cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'],
  })
  orderDetails: OrderDetail[];

  @ManyToOne(() => User)
  user: User;
}
