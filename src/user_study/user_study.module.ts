// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStudy } from './user_study.entity';
import { UserService } from './user_study.service';
import { UserStudyController } from './user_study.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserStudy])],
  providers: [UserService],
  controllers: [UserStudyController],
})
export class UserStudyModule {}
