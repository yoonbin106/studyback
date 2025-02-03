// src/study/study.entity.ts
import { Study } from 'src/study/study.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('notice') // 테이블명 설정
export class Notice {
  @PrimaryGeneratedColumn({ name: 'notice_id', type: 'bigint' })
  noticeId: number;

  @ManyToOne(() => Study, { nullable: false }) // study와 Many-to-One 관계 설정
  @JoinColumn({ name: 'study_id' }) // 외래 키 컬럼 이름 설정
  study: Study; // FK 관계 객체

  @Column({ name: 'notice_name', length: 255 })
  noticeName: string;

  @Column({ name: 'notice_text', length: 2000 })
  noticeText: string;

  @Column({ name: 'notice_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  noticeDate: Date;

  @Column({ name: 'notice_update_date', type: 'timestamp', nullable: true})
  noticeUpdateDate: Date | null;

  //타입스크립트에서 불린으로 설정해도, 실제 디비에는 0 이나 1로 들어감
  @Column({ name: 'notice_status', default: 0})
  noticeStatus: boolean;

}
