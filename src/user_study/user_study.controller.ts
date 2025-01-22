// src/user_study/user_study.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user_study.service';
import { UserStudy } from './user_study.entity';

@Controller('users-studies')
export class UserStudyController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() body: { user_study_num: number }
  ): Promise<UserStudy> {
    return this.userService.createUserStudy(
      body.user_study_num
    );
  }

  @Get()
  async findAll(): Promise<UserStudy[]> {
    return this.userService.getUserStudies();
  }
}
