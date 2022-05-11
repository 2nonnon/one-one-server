import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  level: number;

  @Column({ nullable: true })
  permission: string;

  @Column({ default: `admin` })
  name: string;

  @Column({ unique: true })
  account: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;
}
