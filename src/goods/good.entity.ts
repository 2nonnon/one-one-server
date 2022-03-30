import { Category } from '../categories/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Good {
  @PrimaryGeneratedColumn('increment')
  id: string;

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

  @Column()
  sale_time: string;

  @ManyToMany(() => Category, { eager: false })
  @JoinTable()
  categories: Category[];
}
