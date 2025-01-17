import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataController} from './data/data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',  // MySQL을 사용
      host: 'localhost',  // MySQL 서버 호스트
      port: 3306,  // MySQL 기본 포트
      username: 'lgm',  // MySQL 사용자 이름
      password: 'lgm',  // MySQL 비밀번호
      database: 'studydb',  // 사용하려는 데이터베이스 이름
      entities: [],  // 엔티티 파일을 여기에 추가 (예: [User, Post] 등)
      synchronize: true,  // 자동으로 데이터베이스 구조 동기화
    }),
  ],
  controllers: [AppController,DataController],
  providers: [AppService],
})
export class AppModule {}
