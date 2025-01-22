import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ChatMessage } from './chat_messages.entity';

@Entity('chatroom')
export class Chatroom {
    @PrimaryGeneratedColumn()
    chatroom_id: number; // (채팅방ID:기본키)

    @Column({type:'bigint', nullable:false})
    study_id: number; //!!!!!!!!!!!!!!!!!!이거 나중에 외래키로 수정해야함!!!!!

    @Column({ type: 'timestamp', nullable:false})
    created_time: Date;

    @Column({ type: 'varchar', length: 225, nullable: true})
    last_message:string;

    @OneToMany(() => ChatMessage, (message) => message.chatroom)
    messages: ChatMessage[]; //채팅방에 속한 메세지들
}
