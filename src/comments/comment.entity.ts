import { User } from '../auth/user.entity';
import { Good } from '../goods/good.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: `${Date.now()}` })
  time: string;

  @Column()
  content: string;

  @ManyToOne(() => User, { eager: false })
  user: User;

  @ManyToOne(() => Good, { eager: false })
  good: Good;
}
