// src/token/token.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('refresh')
  async refreshToken(@Body() {refresh_token}:{refresh_token:string}){
    try{
      const access_token=await this.tokenService.validateRefreshToken(refresh_token);
      return {access_token};
    } catch (err){
      throw new HttpException('자동 로그인 실패. 유효하지 않은 토큰.',HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('auto-login')
  async autoLogin(@Body() {refresh_token}:{refresh_token:string}){
    try{
      const newAccessToken= await this.tokenService.validateRefreshToken(refresh_token);
      return {access_token: newAccessToken};
    } catch (err){
      throw new Error('자동 로그인 실패');
    }
  }

  @Post('logout')
  async logout(@Body() {refresh_token}:{refresh_token:string}){
    try{
      await this.tokenService.inactiveRefreshToken(refresh_token);
      return {message: '로그아웃 완료'};
    } catch (err) {
      throw new HttpException('로그아웃 실패', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
  
}
