import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  //   @ManyToOne(() => User, (user) => user.carts, { eager: false })
  //   @Exclude({ toPlainOnly: true })
  //   user: User;
}
