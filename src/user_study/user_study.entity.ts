// src/user_study/user_study.entity.ts
import { User } from 'src/user/user.entity';
import { Study } from 'src/study/study.entity'; // Study 임포트
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('user_study') // 테이블명 설정
export class UserStudy {
  @PrimaryGeneratedColumn({ name: 'user_study_id', type: 'bigint' })
  userStudyId: number; // PK

  @ManyToOne(() => User, (user) => user.studies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // 외래 키 컬럼 이름 설정
  user: User;

  @Column({ type: 'int', nullable: false })
  userStudyNum: number; // 추가적인 숫자 정보

  @OneToMany(() => Study, (study) => study.userStudy) // Study와 One-to-Many 관계 설정
  studies: Study[]; // 여러 개의 Study와 연결
}
