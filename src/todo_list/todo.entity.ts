// src/study/study.entity.ts
import { Study } from 'src/study/study.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('todo') // 테이블명 설정
export class Todo {
  @PrimaryGeneratedColumn({ name: 'todo_id', type: 'bigint' })
  todoId: number;

  @ManyToOne(() => Study, { nullable: false }) // study와 Many-to-One 관계 설정
  @JoinColumn({ name: 'study_id' }) // 외래 키 컬럼 이름 설정
  study: Study; // FK 관계 객체

  @Column({ name: 'todo_name', length: 255 })
  todoName: string;

  @Column({ name: 'todo_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  todoDate: Date;

  //업데이트 날짜가 왜 필요하지??????
  @Column({ name: 'todo_update_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  todoUpdateDate: Date;

  //타입스크립트에서 불린으로 설정해도, 실제 디비에는 0 이나 1로 들어감
  @Column({ name: 'todo_status', default: 0})
  todoStatus: boolean;

}
