// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { Chatroom } from './chat/chatroom.entity';
import { ChatMessage } from './chat/chat_messages.entity';
import { ChatMessageRead } from './chat/chat_message_read.entity';
import { ChatModule } from './chat/chat.module';
import { HomeModule } from './home/home.module';
import { UserStudy } from './user_study/user_study.entity';
import { Token } from './token/token.entity';
import { Study } from './study/study.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'study_app',
      entities: [User, Chatroom, ChatMessageRead, ChatMessage, Token, Study,UserStudy],
      synchronize: true,
    }),
    UserModule,
    ChatModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}