import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('hello')
export class AppController 
{
  constructor(@Inject(AppService) private readonly appService: AppService) 
  {
    // console.log('constructor run');
    // console.log(this.appService);
  }

  @Get()
  getHello(): string 
  {
    return this.appService.getHello();
  }
}
