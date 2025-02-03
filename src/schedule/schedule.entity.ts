// src/study/study.entity.ts
import { Study } from 'src/study/study.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('schedule') // 테이블명 설정
export class Schedule {
  @PrimaryGeneratedColumn({ name: 'schedule_id', type: 'bigint' })
  scheduleId: number;

  @ManyToOne(() => Study, { nullable: false }) // study와 Many-to-One 관계 설정
  @JoinColumn({ name: 'study_id' }) // 외래 키 컬럼 이름 설정
  study: Study; // FK 관계 객체

  @Column({ name: 'schedule_name', length: 255 })
  scheduleName: string;

  @Column({ name: 'schedule_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  scheduleDate: Date;

  @Column({ name: 'schedule_content', length: 255 })
  scheduleContent: string;

}
