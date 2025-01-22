import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ChatMessage} from './chat_messages.entity';
import { User } from 'src/user/user.entity';

@Entity('chat_message_read')
export class ChatMessageRead {
    @PrimaryGeneratedColumn()
    chat_message_read_id: number;

    @ManyToOne(() => ChatMessage, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'chat_message_id'})
    chat_message: ChatMessage;

    @ManyToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'bigint', nullable: false})
    study_id: number; //!!!!!!!!!!!나중에 외래키로 수정!!!!!

    @Column ({ type: 'boolean' , nullable: false, default: false})
    has_read: boolean;

} 