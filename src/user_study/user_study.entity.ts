// src/user_study/user_study.entity.ts
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class UserStudy {
  @PrimaryGeneratedColumn()
  user_study_id: number; // PK

  @ManyToOne(() => User, (user) => user.studies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // FK
  user: User;

  @Column({type:'int'})
  user_study_num: number;

}
