// src/token/token.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private jwtService:JwtService,
    
  ) {}

  // 리프레시 토큰 저장
  async saveRefreshToken(user:User, refreshToken:string, userAgent:string){
    await this.tokenRepository.update(
      {user: {user_id:user.user_id}, status:'active'},
      {status: 'inactive'}
    );

    const token = this.tokenRepository.create({
      user,
      token_value: refreshToken,
      user_agent: userAgent,
      expired_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일
      status: 'active',
    });

    return this.tokenRepository.save(token);
  };

  // 리프레시 토큰 검증 & 액세스 토큰 재발급
  async validateRefreshToken(refreshToken:string){
    const token = await this.tokenRepository.findOne({
      where: {token_value:refreshToken, status:'active'},
      relations: ['user'],
    });

    if(!token) throw new Error('유효하지 않은 Refresh Token입니다.');

    const user = token.user;
    const payload = {user_id: user.user_id, nickname: user.nickname};
    return this.jwtService.sign(payload, {expiresIn: '1h'});
  }

 // 리프레시 토큰 검증 및 액세스 토큰 재발급
 async inactiveRefreshToken(refreshToken:string){
  return this.tokenRepository.update(
    {token_value:refreshToken},{status:'inactive'});
  }
}
