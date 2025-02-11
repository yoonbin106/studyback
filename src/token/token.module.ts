// src/token/token.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenController } from './token.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: {expiresIn: '60s'}
    }),
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
