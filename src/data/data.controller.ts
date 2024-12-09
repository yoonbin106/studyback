import { Controller, Get } from '@nestjs/common';

@Controller()
export class DataController {
  @Get('data')
  getData() {
    return { message: 'Hello from the backend!' };
  }
}
