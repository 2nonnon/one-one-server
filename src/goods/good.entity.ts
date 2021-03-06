import { Sku } from './../skus/sku.entity';
import { Category } from '../categories/category.entity';
import { Comment } from '../comments/comment.entity';
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
  id: number;

  @Column({ default: `${Date.now()}` })
  code: string;

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

  @Column({ default: false })
  hasSku: boolean;

  @Column({ default: 0 })
  sold?: number;

  @Column({ default: `${Date.now()}` })
  sale_time?: string;

  @Column('simple-array')
  banner: string[];

  @Column('simple-array')
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

  @OneToMany(() => Comment, (comment) => comment.good)
  comments: Comment[];
}
