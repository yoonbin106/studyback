// src/user/user.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: { nickname: string; password: string }): Promise<User> {
    return this.userService.createUser(body.nickname, body.password);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
