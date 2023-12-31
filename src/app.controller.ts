import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test/error')
  getTestError(): string {
    throw new HttpException('500 server error test', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
