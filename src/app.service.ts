import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService 
{
  constructor()
  {
    // console.log('hello provider');
  }
  getHello(): string 
  {
    return 'Hello World!';
  }
}
