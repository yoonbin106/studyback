// src/user/user.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './fine.service';
import { User } from './fine.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: { name: string; email: string }): Promise<User> {
    return this.userService.createUser(body.name, body.email);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
