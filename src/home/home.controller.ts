import { Controller, Get} from '@nestjs/common';

@Controller('home')
export class HomeController {
    @Get()
    getHomeData() {
        //일단은 더미데이터..

        return {
            study: {
                name: '맥바공식 스터디1',
                notice: '스터디 1 공지입니다',
                dDay: 'D-10',
            },
            calendar: [],
        };
    }
}