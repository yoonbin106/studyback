// src/study/study.entity.ts
import { Study } from 'src/study/study.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('fine') // 테이블명 설정
export class Fine {
  @PrimaryGeneratedColumn({ name: 'fine_id', type: 'bigint' })
  fineId: number;

  @ManyToOne(() => Study, { nullable: false }) // study와 Many-to-One 관계 설정
  @JoinColumn({ name: 'study_id' }) // 외래 키 컬럼 이름 설정
  study: Study; // FK 관계 객체

  @Column({ name: 'fine_name', length: 255 })
  fineName: string;

  @Column({ name: 'fine_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fineDate: Date;

  @Column({ name: 'fine_amount' })
  fineAmount: number;

  //타입스크립트에서 불린으로 설정해도, 실제 디비에는 0 이나 1로 들어감
  @Column({ name: 'fine_paid', default: 0})
  finePaid: boolean;

}
