import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.carts, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
