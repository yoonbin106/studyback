// src/user_study/user_study.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { TokenModule } from 'src/token/token.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TokenModule,
    JwtModule.register({
          secret: 'your-secret-key',
          signOptions: {expiresIn: '60s'}
        }),
  ],
  providers: [UserService],
  exports: [UserService],
  
})
export class UserModule {}
