import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chatroom } from './chatroom.entity';
import { ChatMessage } from './chat_messages.entity';
import { ChatMessageRead } from './chat_message_read.entity';
import { UserService } from 'src/user/user.service';


// 채팅 관련 비즈니스 로직 구현
@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chatroom)
    private chatroomRepository: Repository<Chatroom>, // Chatroom 엔터티를 위한 Repository

    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>, // ChatMessage 엔터티를 위한 Repository

    @InjectRepository(ChatMessageRead)
    private chatMessageReadRepository: Repository<ChatMessageRead>, // ChatMessageRead 엔터티를 위한 Repository

    private userService: UserService,
  ) {}

  // 새로운 채팅방 생성
  async createChatroom(studyId: number): Promise<Chatroom> {
    const newChatroom = this.chatroomRepository.create({
      study_id: studyId,
      created_time: new Date(),
    });
    return this.chatroomRepository.save(newChatroom);
  }

  // 채팅 메시지 추가
  async addMessage(chatroomId: number, message: string): Promise<ChatMessage> {
    const newMessage = this.chatMessageRepository.create({
      chatroom: { chatroom_id: chatroomId }, // chatroom 관계 설정
      message,
      created_time: new Date(),
    });
    return this.chatMessageRepository.save(newMessage);
  }

   // 메시지 읽음 상태 업데이트
   async markMessageAsRead(chatMessageId: number, userId: number): Promise<ChatMessageRead> {
    // ChatMessage와 User 엔터티 조회
    const chatMessage = await this.chatMessageRepository.findOneByOrFail({ chat_messages_id: chatMessageId });
    const user = await this.userService.getUserById( userId );

  //읽음 상태 엔터티 생성
  const readStatus = this.chatMessageReadRepository.create({
    chat_message: chatMessage, // ChatMessage 엔터티 전달
    user: user, // User 엔터티 전달
    has_read: true,
  });

  // 저장
  return this.chatMessageReadRepository.save(readStatus);
  }

  // 특정 채팅방의 메시지 목록 조회
  async getMessages(chatroomId: number): Promise<ChatMessage[]> {
    return this.chatMessageRepository.find({
      where: { chatroom: { chatroom_id: chatroomId } },
      relations: ['chatroom'], // 관련된 채팅방 정보도 포함
    });
  }

  // 채팅방 삭제
  async deleteChatroom(chatroomId: number): Promise<void> {
    await this.chatroomRepository.delete({ chatroom_id: chatroomId });
  }

  // UserReposiroy 사용
  async getUserId(userId: number){
    const user = await this.userService.getUserById(userId);
    return user;
  }
}
