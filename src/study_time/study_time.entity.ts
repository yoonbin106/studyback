// src/study/study.entity.ts
import { Study } from 'src/study/study.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('study_time') // 테이블명 설정
export class StudyTime {
  @PrimaryGeneratedColumn({ name: 'study_time_id', type: 'bigint' })
  studyTimeId: number;

  @ManyToOne(() => Study, { nullable: false }) // study와 Many-to-One 관계 설정
  @JoinColumn({ name: 'study_id' }) // 외래 키 컬럼 이름 설정
  study: Study; // FK 관계 객체

  @Column({ name: 'study_time_name', length: 255 })
  studyTimeName: string;

  @Column({ name: 'study_time_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  studyTimeDate: Date;

  @Column({ name: 'study_time_amount', length: 255 })
  studyTimeAmount: string;

}
