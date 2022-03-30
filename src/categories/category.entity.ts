import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  parentId: number;

  // @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  // @Exclude({ toPlainOnly: true })
  // user: User;
}
