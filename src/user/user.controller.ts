// src/user/user.controller.ts
import { Body, Controller, Delete, Get, Headers, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 사용자 등록
  @Post('/')
  async createUser(@Body() {nickname, password}:{nickname:string, password:string}){
    return this.userService.create(nickname, password);
  }

  // 로그인 처리
  @Post('/login')
  async login(@Body() {nickname, password, userAgent}:{nickname:string, password:string, userAgent: string},){
    return this.userService.login(nickname, password, userAgent);
  }
  
  // 사용자 조회(유저 id로)
  @Get(':user_id')
  async readUser(@Param('user_id') user_id:number){
    return this.userService.getUserById(user_id);
  }

  // 사용자 삭제(유저 id로)
  @Delete(':user_id')
  async deleteUser(@Param('user_id') user_id:number){
    return this.userService.delete(user_id);
  }

}
