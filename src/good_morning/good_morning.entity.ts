// src/study/study.entity.ts
import { Study } from 'src/study/study.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('good_morning') // 테이블명 설정
export class GoodMorning {
  @PrimaryGeneratedColumn({ name: 'good_morning_id', type: 'bigint' })
  goodMorningId: number;

  @ManyToOne(() => Study, { nullable: false }) // study와 Many-to-One 관계 설정
  @JoinColumn({ name: 'study_id' }) // 외래 키 컬럼 이름 설정
  study: Study; // FK 관계 객체

  @Column({ name: 'good_morning_name', length: 255 })
  goodMorningName: string;

  @Column({ name: 'good_morning_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  goodMorningDate: Date;

  //기상인증 상태?????
  //타입스크립트에서 불린으로 설정해도, 실제 디비에는 0 이나 1로 들어감
  @Column({ name: 'good_morning_status', default: 0})
  goodMorningStatus: boolean;

}
