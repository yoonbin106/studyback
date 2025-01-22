// src/study/study.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity('study') // 테이블명을 명시적으로 설정
export class Study {
  @PrimaryGeneratedColumn({ name: 'study_id', type: 'bigint' }) 
  studyId: string; // number(19,0)은 bigint로 매핑되므로 string 사용

  @ManyToOne(() => UserStudy, { nullable: false}) // UserStudy와 Many-to-One 관계 설정
  @JoinColumn({ name: 'user_study_id' }) // 외래 키 컬럼 이름 설정
  userStudy: UserStudy; // FK 관계 객체

  @Column({ name: 'study_name', type: 'varchar', length: 255, nullable: false })
  studyName: string;

  @Column({ name: 'study_date', type: 'varchar', length: 255, nullable: true })
  studyDate: string | null;

  @Column({ name: 'study_password', type: 'varchar', length: 10, nullable: true })
  studyPassword: string | null;

  @Column({ name: 'study_activated', type: 'int', nullable: false })
  studyActivated: number; // 활성화 여부 (1: 활성화, 0: 비활성화)

  @Column({ name: 'study_admin', type: 'int', nullable: false })
  studyAdmin: number; // 관리자 여부 (1: 관리자, 0: 비관리자)

  @Column({ name: 'study_calendar', type: 'varchar', length: 2000, nullable: true })
  studyCalendar: string | null;
}
