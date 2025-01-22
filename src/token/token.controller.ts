// src/token/token.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { TokenService } from './token.service';
import { Token } from './token.entity';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  async create(@Body() body: { token_value: string; user_agent: string }): Promise<Token> {
    return this.tokenService.createToken(body.token_value, body.user_agent);
  }

  @Get()
  async findAll(): Promise<Token[]> {
    return this.tokenService.getTokens();
  }
}
