import { Body, Catch, Controller, HttpCode, HttpStatus, Post, Req, Res, SetMetadata, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RefreshTokenDto, SignInRequest } from './auth.dto';
import { ErrorResponse } from '../common/common.types';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { BadRequestFilter } from './auth.filter';
import { IS_PUBLIC_KEY } from './constants';
import { Public } from './auth.decorators';
import { Request } from 'express';

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
  async signIn(@Body() signInDto: SignInRequest, @Res() response: Response, @Req() request: Request)
  {
    const errors = {
      userName: null as null | string,
      password: null as null | string
    };

    if(typeof(signInDto.userName) != 'string')
    {
      errors.userName = 'Имя пользователя должно быть передано';
    }
    if(typeof(signInDto.password) != 'string')
    {
      errors.password = 'Пароль должен быть передан';
    }

    if(errors.userName != null || errors.password != null)
    {
      response.send(errors);  
      
      return;
    }
    
    const res = await this.authService.signIn(signInDto);
     
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


