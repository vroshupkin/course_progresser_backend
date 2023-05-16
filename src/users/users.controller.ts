import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateRequest, CreateResponseError, CreateResponseFail, CreateResponseSuccess, ResponseGetUser  } from './user.dto';
import { Response } from 'express';
import { ErrorResponse } from 'src/common/common.types';
import { ApiOperation, ApiParam, ApiProperty, ApiQuery, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { curry } from 'ramda';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/auth.decorators';


@ApiTags('users')
@Controller('users')
@ApiSecurity('X-API-KEY', [ 'X-API-KEY' ]) // <----- Авторизация через Swagger
export class UsersController
{
  constructor(private usersService: UsersService)
  {}

  @Get('all')
  @UseGuards(AuthGuard)
  async getUsers()
  { 

    return this.usersService.FindAll();
  }


  @Get(':userName')
  @UseGuards(AuthGuard)
  // Swagger doc
  @ApiOperation({ summary: 'Возвращает данные пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseGetUser })
  @ApiParam({ name: 'userName', required: true, description: 'Имя пользователя' })
  
  async getUser(@Param('userName') params: {userName: string})
  {
    const user = await this.usersService.FindOne(params.userName);

    if(user == null)
    {
      return `Пользователя с именем = ${params.userName} не найдено`;
    }
     
    return user;
  }


  @Post('register')
  @HttpCode(201)
  @Public()

  @ApiOperation({ summary: 'Регистрирует нового пользователя' })
  async createUser(@Body() userDtoAdd: CreateRequest)
  {
    await this.usersService.Create(userDtoAdd); 
    
    return 'ok';
  }

}