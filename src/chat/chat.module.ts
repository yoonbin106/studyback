import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chatroom } from './chatroom.entity';
import { ChatMessage } from './chat_messages.entity';
import { ChatMessageRead } from './chat_message_read.entity';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller'; 
import { UserModule } from 'src/user/user.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([Chatroom, ChatMessage, ChatMessageRead]),
        UserModule,
    ],
    controllers: [ChatController],
    providers: [ChatService],
    exports: [ChatService],
})

export class ChatModule {}
