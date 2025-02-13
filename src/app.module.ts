// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { HomeModule } from './home/home.module';
import { HomeController } from './home/home.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'studydb', //localhost로 바꾸세요
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'study_app',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    UserModule,
    ChatModule,
    HomeModule,
  ],
  controllers: [AppController,HomeController, UserController],
  providers: [AppService],
})
export class AppModule {}
