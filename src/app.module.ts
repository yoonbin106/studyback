// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataController } from './data/data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    // TypeORM 설정
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'study_app',
      entities: [User],
      synchronize: true,
    }),

    // UserModule 임포트
    UserModule,
  ],
  controllers: [AppController, DataController],
  providers: [AppService],
})
export class AppModule {}
