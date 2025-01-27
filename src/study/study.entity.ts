// src/study/study.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserStudy } from '../user_study/user_study.entity'; // UserStudy 임포트
import { Fine } from 'src/fine/fine.entity';
import { GoodMorning } from 'src/good_morning/good_morning.entity';
import { StudyTime } from 'src/study_time/study_time.entity';
import { Notice } from 'src/notice/notice.entity';
import { Schedule } from 'src/schedule/schedule.entity';

@Entity('study') // 테이블명 설정
export class Study {
  @PrimaryGeneratedColumn({ name: 'study_id', type: 'bigint' })
  studyId: number;

  @ManyToOne(() => UserStudy, { nullable: false }) // UserStudy와 Many-to-One 관계 설정
  @JoinColumn({ name: 'user_study_id' }) // 외래 키 컬럼 이름 설정
  userStudy: UserStudy; // FK 관계 객체

  @Column({ name: 'study_name', type: 'varchar', length: 255, nullable: false })
  studyName: string;

  @Column({ name: 'study_date', type: 'varchar', length: 255, nullable: true })
  studyDate: string | null;

  @Column({ name: 'study_password', type: 'varchar', length: 10, nullable: true })
  studyPassword: string | null;

  @Column({ name: 'study_activated', type: 'int', nullable: false })
  studyActivated: number;

  @Column({ name: 'study_admin', type: 'int', nullable: false })
  studyAdmin: number;

  @Column({ name: 'study_calendar', type: 'varchar', length: 2000, nullable: true })
  studyCalendar: string | null;

  @OneToMany(() => Fine, (fine) => fine.study)
  fines: Fine[];

  @OneToMany(() => GoodMorning, (goodmorning) => goodmorning.study)
  goodMornings: GoodMorning[];

  @OneToMany(() => StudyTime, (studyTime) => studyTime.study)
  studyTimes: StudyTime[];

  @OneToMany(() => Notice, (notice) => notice.study)
  notices: Notice[];

  @OneToMany(() => Schedule, (schedule) => schedule.study)
  schedules: Schedule[];
}
