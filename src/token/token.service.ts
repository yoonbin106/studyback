// src/token/token.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async createToken(token_value: string, user_agent: string): Promise<Token> {
    const token = new Token();
    token.token_value = token_value;
    token.user_agent = user_agent;
    return this.tokenRepository.save(token);
  }

  async getTokens(): Promise<Token[]> {
    return this.tokenRepository.find();
  }
}
