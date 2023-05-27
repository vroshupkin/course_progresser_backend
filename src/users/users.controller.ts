import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateDto, CreateResponseError, CreateResponseFail, CreateResponseSuccess, DeleteDto, GetUserDto  } from './user.dto';
import { Response } from 'express';
import { ErrorResponse } from 'src/common/common.types';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiProperty, ApiQuery, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { curry } from 'ramda';
import { AdminGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/auth.decorators';


@ApiTags('users')
@Controller('users')

export class UsersController
{
  constructor(private usersService: UsersService)
  {}

  @Get('all')
  @ApiBearerAuth()
  async getUsers()
  { 

    return this.usersService.FindAll();
  }


  @Get(':userName')
  
  @ApiOperation({ summary: 'Возвращает данные пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: GetUserDto })
  @ApiParam({ name: 'userName', required: true, description: 'Имя пользователя' })
  @ApiBearerAuth()
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
  async createUser(@Body() userDtoAdd: CreateDto)
  {
    await this.usersService.Create(userDtoAdd); 
    
    return 'ok';
  }

  
  @Delete('delete')
  @HttpCode(200)
  @Public()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()

  @ApiOperation({ summary: 'Удаляет пользователя' })
  async delete(@Body() deleteDto: DeleteDto)
  { 
    const res = await this.usersService.Delete(deleteDto.userName);

    if(res.deletedCount === 0)
    {
      return `Пользователь с именем "${deleteDto.userName}" не найден`;  
    }
    
    return 'ok';
  }
  
}