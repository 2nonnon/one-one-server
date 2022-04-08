import { Sku } from './../skus/sku.entity';
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  quantity: number;

  // eager: 查询数据库时是否自动返回， Exclude({ toPlainOnly: true }) 返回数据时是否排除
  @OneToOne(() => Sku, { eager: true })
  // @Exclude({ toPlainOnly: true })
  @JoinColumn()
  sku: Sku;

  @ManyToOne(() => User, (user) => user.carts, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
