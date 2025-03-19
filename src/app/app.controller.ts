import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/teste')
  getTeste(){
    return "rota de teste"
  }

  @Post('/teste')
  postTeste(){
    return "rota de teste post"
  }
}
