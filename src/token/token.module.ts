// src/token/token.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: {expiresIn: '60s'}
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
