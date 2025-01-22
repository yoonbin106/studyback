import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat') // 기본 라우트 경로: /chat
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // 새로운 채팅방 생성
  @Post('create_room')
  async createChatroom(@Body('studyId') studyId: number) {
    return this.chatService.createChatroom(studyId);
  }

  // 채팅 메시지 추가
  @Post('add_message')
  async addMessage(@Body('chatroomId') chatroomId: number, @Body('message') message: string) {
    return this.chatService.addMessage(chatroomId, message);
  }

  // 메시지 읽음 상태 업데이트
  @Post('mark_read')
  async markMessageAsRead(@Body('chatMessageId') chatMessageId: number, @Body('userId') userId: number) {
    return this.chatService.markMessageAsRead(chatMessageId, userId);
  }

  // 특정 채팅방의 메시지 목록 조회
  @Get('messages/:chatroomId')
  async getMessages(@Param('chatroomId') chatroomId: number) {
    return this.chatService.getMessages(chatroomId);
  }

  // 채팅방 삭제
  @Delete('delete-room/:chatroomId')
  async deleteChatroom(@Param('chatroomId') chatroomId: number) {
    return this.chatService.deleteChatroom(chatroomId);
  }
}
