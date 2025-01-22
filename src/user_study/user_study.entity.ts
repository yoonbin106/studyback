// src/user_study/user_study.entity.ts
import { Study } from 'src/study/study.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class UserStudy {
  @PrimaryGeneratedColumn()
  user_study_id: number; // PK

  @ManyToOne(() => User, (user) => user.studies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // FK
  user: User;

  @Column({type:'int'})
  user_study_num: number;

  @OneToMany(() => Study, (study) => study.userStudy) // Study와 One-to-Many 관계 설정
  studies: Study[]; // 여러 개의 Study와 연결
}
