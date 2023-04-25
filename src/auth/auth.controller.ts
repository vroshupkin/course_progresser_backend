import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignInRequest } from './auth.dto';
import { ErrorResponse } from 'src/common/common.types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController 
{

  constructor(private authService: AuthService){}

  @Post()
  @HttpCode(201)
  async signIn(@Body() signInDto: SignInRequest, @Res() response: Response)
  {
    
    const res = await this.authService.signIn(signInDto);
    if(res instanceof ErrorResponse)
    {
      response.status(HttpStatus.BAD_REQUEST).send(res);
      
      return;
    }
    
    response.send(res);
    
    
  }
  
  
}
