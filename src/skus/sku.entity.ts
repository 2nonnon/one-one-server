import { Good } from './../goods/good.entity';
import { Attribute } from './../attributes/attribute.entity';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sku {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  img_url: string;

  @Column()
  market_price: number;

  @Column()
  price: number;

  @Column()
  sold: number;

  @Column()
  stock: number;

  @ManyToOne(() => Good, (user) => user.skus, { eager: false })
  @Exclude({ toPlainOnly: true })
  good: Good;

  @ManyToMany(() => Attribute, { eager: true })
  @JoinTable()
  attributes: Attribute[];
}
