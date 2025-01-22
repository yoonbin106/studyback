// src/user/user.entity.ts
import { Study } from 'src/study/study.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Fine {
  @PrimaryGeneratedColumn()
  fine_id: number;

  @ManyToOne(() => Study, (study) => study.fines, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // FK
  study: Study;

  @Column()
  fine_name: string;

  @Column()
  fine_date: string;

  @Column()
  fine_amount: string;

  @Column()
  fine_status: string;

}
