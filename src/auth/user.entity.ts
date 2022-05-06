import { Exclude } from 'class-transformer';
import { Cart } from './../carts/cart.entity';
import { Address } from './../addresses/address.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  openid: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  session: string;

  @Column({ unique: true, default: `用户${Date.now() % 10e9}` })
  username: string;

  @Column({ unique: true, nullable: true })
  account: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
