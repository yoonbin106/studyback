import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Chatroom } from './chatroom.entity';

@Entity('chat_messages')
export class ChatMessage {
    @PrimaryGeneratedColumn()
    chat_messages_id: number; //채팅 메시지ID 기본키임

    @ManyToOne(() => Chatroom, (chatroom) => chatroom.messages, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'chatroom_id'}) //외래키
    chatroom : Chatroom;
    
    @Column({ type: 'timestamp' , nullable: false})
    created_time: Date;

    @Column({ type: 'timestamp', nullable: true })
    deleted_time: Date;

    @Column({ type: 'boolean', nullable: false, default: false})
    is_deleted: boolean;

    @Column({ type: 'varchar', length: 225, nullable: false})
    message: string;

    

}