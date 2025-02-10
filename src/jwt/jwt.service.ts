import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtTokenService{
    constructor(private jwtService: JwtService) {}

    // 액세스 토큰 생성 (1시간 만료)
    generateAccessToken(payload: any){
        return this.jwtService.sign(payload,{expiresIn: '1h'});
    }

    // 리프레시 토큰 생성 (7일 만료)
    generateRefreshToken(payload: any){
        return this.jwtService.sign(payload,{expiresIn: '7d'});
    }

    // JWT 검증
    verifyToken(token: string){
        return this.jwtService.verify(token);
    }
}