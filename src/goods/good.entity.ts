import { Sku } from './../skus/sku.entity';
import { Category } from '../categories/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Good {
  @PrimaryGeneratedColumn('increment')
  id?: string;

  @Column()
  cover_url: string;

  @Column()
  market_price: number;

  @Column()
  price: number;

  @Column()
  name: string;

  @Column()
  tag: number;

  @Column()
  total_stock: number;

  @Column({ default: 0 })
  sold?: number;

  @Column({ default: `${Date.now()}` })
  sale_time?: string;

  @Column('simple-array', { default: [] })
  banner: string[];

  @Column('simple-array', { default: [] })
  detail: string[];

  @ManyToMany(() => Category, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Sku, (sku) => sku.good, {
    cascade: true,
  })
  skus: Sku[];
}
