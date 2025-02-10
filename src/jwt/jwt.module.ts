import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'your-secret-key',
            signOptions: { expiresIn: '1h' }, // 기본 만료 시간 설정
        }),
    ],
    exports: [JwtModule],
})

export class JwtConfigModule {}