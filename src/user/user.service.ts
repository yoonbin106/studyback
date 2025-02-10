// src/user/user.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { TokenService } from 'src/token/token.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private tokenService: TokenService,
    private jwtService: JwtService,
  ) {}

  // 회원가입
  async create(nickname:string, password:string): Promise<User>{
    // 이미 존재하는 사용자인지 확인
    const existUser = await this.userRepository.findOne({
      where: [{nickname}],
    });

    if (existUser) {
      throw new HttpException(
        '이미 존재하는 사용자입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 비밀번호 해싱
    const hashedPassword= await bcrypt.hash(password,10);

    const newUser= this.userRepository.create({
      nickname,
      password: hashedPassword,

    });

    // 사용자 저장
    return this.userRepository.save(newUser);


  }

  
    // 사용자 삭제(유저 id로)
    async delete(userId:number): Promise<void>{
      const user = await this.userRepository.findOne({where:{user_id:userId}})
      if(!user) {
        throw new HttpException('사용자를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
      }
      await this.userRepository.remove(user);
    }


  // 로그인
  async login(nickname:string, password:string, userAgent:string){
    
    const user= await this.userRepository.findOne({where:{nickname}, relations:['token']});
    if(!user) throw new HttpException('존재하지 않는 사용자입니다.', HttpStatus.BAD_REQUEST);

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) throw new Error('비밀번호가 틀렸습니다.');

    const payload={user_id: user.user_id, nickname:user.nickname};
    const accessToken=this.jwtService.sign(payload, {expiresIn:'1h'});
    const refreshToken=this.jwtService.sign(payload, {expiresIn:'7d'});
    
    await this.tokenService.saveRefreshToken(user,refreshToken,userAgent);
  
    return {message:'로그인 성공', access_token:accessToken, refresh_token:refreshToken};
  }

  // 리프레시 토큰 검증 & 액세스 토큰 재발급
  async refreshToken(refreshToken:string){
    try{
      const newAccessToken= await this.tokenService.validateRefreshToken(refreshToken);
      return {message:'토큰 갱신 성공', access_token: newAccessToken};
    } catch(err) {
        throw new HttpException('유효하지 않은 토큰입니다.', HttpStatus.UNAUTHORIZED);
    }
  }

  // 자동로그인
  async autoLogin(refreshToken:string){
    try{
      const newAccessToken= await this.tokenService.validateRefreshToken(refreshToken);
      return {message:'자동 로그인 성공', access_token: newAccessToken}
    } catch(error) {
      throw new Error('유효하지 않은 토큰입니다.');

    }
  }

  // 로그아웃
  async logout(refresh_token:string){
    await this.tokenService.inactiveRefreshToken(refresh_token);
    return {message:'로그아웃 완료'};
  }

  // 사용자 정보 가져오는 메소드
  async getUserById(userId:number): Promise<User>{
    return this.userRepository.findOne({where:{user_id:userId}});

  }

}
