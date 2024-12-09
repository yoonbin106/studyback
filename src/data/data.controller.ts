import { Controller, Get } from '@nestjs/common';

@Controller()
export class DataController {
  @Get('data')
  getData() {
    return { message: '백엔드 연결 성공' };
  }
}
