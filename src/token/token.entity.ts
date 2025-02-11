// src/token/token.entity.ts
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  token_id: number; // PK

  @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // FK
  user: User;

  @Column({type:'varchar', length:255 })
  token_value: string; //리프레시 토큰 저장

  @Column({type:'varchar', length:255, default: 'default_user_agent'}) 
  user_agent: string; //로그인한 기기 정보 저장

  @Column({type:'timestamp', default:()=>'CURRENT_TIMESTAMP'})
  expired_date: Date; //만료일

  //@Column({type:'timestamp', default:()=>'CURRENT_TIMESTAMP'})
  //expired_time: Date; 

  @Column({type:'varchar', length:255, default:'active'})
  status: string; // 속성값: active, inactive
  
}
