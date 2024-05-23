import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Public } from './auth.decorators';
import { RefreshTokenDto, SignInRequest } from './auth.dto';
import { BadRequestFilter } from './auth.filter';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')


export class AuthController 
{

  constructor(private authService: AuthService){}

  @Post('signIn')
  @Public()
  @HttpCode(200)
  @UseFilters(new BadRequestFilter())
  @ApiOperation({ summary: 'Вход в приложение и получение jwt токена' })
  async signIn(@Body() body: SignInRequest, @Res() response: Response, @Req() request: Request)
  {
    const errors = {
      userName: null as null | string,
      password: null as null | string
    };

    if(!body.username)
    {
      errors.userName = 'Имя пользователя должно быть передано';
    }
    if(!body.password)
    {
      errors.password = 'Пароль должен быть передан';
    }

    if(errors.userName != null || errors.password != null)
    {
      response.send(errors);  
      
      return;
    }
    
    const res = await this.authService.signIn(body);
     
    response.send(res);
  }
  
  
  @Post('refreshToken')
  @Public()
  @HttpCode(201)
  @UseFilters(new BadRequestFilter())

  @ApiOperation({ summary: 'Обновляет jwt токен' })
  @ApiResponse({ status: HttpStatus.OK })
  async refreshToken(@Body() dto: RefreshTokenDto, @Res() response: Response)
  {
    
    const res = await this.authService.refresh(dto);
    response.send(res);
  }


}


