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

  @Column({type:'timestamp', default:()=>'CURRENT_TIMESTAMP'})
  expired_date: Date;

  // 만료시간이 만료날짜랑 중복될것같은데 지울까 ..? >> 토큰 발급일자를 넣자!
  //@Column({type:'timestamp', default:()=>'CURRENT_TIMESTAMP'})
  //expired_time: Date; 

  @Column({type:'timestamp', default:()=>'CURRENT_TIMESTAMP'})
  create_date: Date;

  @Column({type:'varchar', length:255, default:'active'})
  status: string;

  @Column({type:'varchar', length:255})
  token_value: string;

  @Column({type:'varchar', length:255})
  user_agent: string;
  
}
