import { User } from './../auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  receiver: string;

  @Column()
  mobile: string;

  @Column()
  destination: string;

  @Column({ nullable: true })
  remark: string;

  @Column()
  isDefault: boolean;

  @ManyToOne(() => User, (user) => user.addresses, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
