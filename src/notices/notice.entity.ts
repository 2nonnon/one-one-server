import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  url: string;

  @Column()
  position: string;
}
