// src/user/user.entity.ts
import { Token } from 'src/token/token.entity';
import { UserStudy } from 'src/user_study/user_study.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number; // PK

  @Column({type:'varchar', length:255})
  nickname: string;

  @Column({type:'varchar', length:255})
  password: string;

  @Column({type:'int', default:1}) // 1: 활성화, 0: 비활성화
  is_activated: number;

  @Column({type:'int', default:0}) // 0: 일반회원, 1: 관리자
  is_admin: number;

  @Column({type:'timestamp', default:()=>'CURRENT_TIMESTAMP'})
  create_time: Date;

  @OneToMany(() => UserStudy, (userStudy) => userStudy.user)
  studies: UserStudy[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
  
}
