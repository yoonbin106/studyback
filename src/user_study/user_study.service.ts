// src/user_study/user_study.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStudy } from './user_study.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserStudy)
    private userStudyRepository: Repository<UserStudy>,
  ) {}

  async createUserStudy(user_study_num: number): Promise<UserStudy> {
    const userStudy = new UserStudy();
    userStudy.userStudyNum = user_study_num;
    return this.userStudyRepository.save(userStudy);
  }

  async getUserStudies(): Promise<UserStudy[]> {
    return this.userStudyRepository.find();
  }
}
