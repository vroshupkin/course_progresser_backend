import { Body, Catch, Controller, HttpCode, HttpStatus, Post, Res, SetMetadata, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RefreshTokenDto, SignInRequest } from './auth.dto';
import { ErrorResponse } from 'src/common/common.types';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { BadRequestFilter } from './auth.filter';
import { IS_PUBLIC_KEY } from './constants';
import { Public } from './auth.decorators';

@ApiTags('auth')
@Controller('auth')


export class AuthController 
{

  constructor(private authService: AuthService){}

  @Post('signIn')
  @Public()
  @HttpCode(201)
  

  @ApiOperation({ summary: 'Вход в приложение и получение jwt токена' })
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


