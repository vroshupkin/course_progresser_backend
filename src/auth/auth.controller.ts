import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignInRequest } from './auth.dto';
import { ErrorResponses } from 'src/common/common.types';

@Controller('auth')
export class AuthController 
{

  constructor(private authService: AuthService){}

  @Post()
  @HttpCode(201)
  async signIn(@Body() signInDto: SignInRequest, @Res() response: Response)
  {
    
    // console.log(signInDto);
    const res = await this.authService.signIn(signInDto);
    // console.log(res);
    console.log(res);
    if(res instanceof ErrorResponses)
    {
      response.status(HttpStatus.BAD_REQUEST).send(res);
      
      return;
    }
    
    response.send(res);
    
    // console.log(res);
    // if(Array.isArray(res))
    // {
    //   response.send(res);
      
    //   return;
    // }

    
    // response.send('success');
    
    
  }
  
  
}
