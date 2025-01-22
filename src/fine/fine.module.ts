// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fine } from './fine.entity';
import { UserService } from './fine.service';
import { UserController } from './fine.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fine])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
