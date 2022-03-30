import { Cart } from './../carts/cart.entity';
import { Address } from './../addresses/address.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // eager 为 true 时，获取 user 时自动获取 addresss
  @OneToMany(() => Address, (address) => address.user, { eager: true })
  addresses: Address[];

  @OneToMany(() => Cart, (cart) => cart.user, { eager: true })
  carts: Cart[];
}
