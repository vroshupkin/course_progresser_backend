import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateRequest, CreateResponseError, CreateResponseFail, CreateResponseSuccess  } from './user.dto';
import { Response } from 'express';
import { ErrorResponse } from 'src/common/common.types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController
{
  constructor(private usersService: UsersService)
  {}

  @Get('all')
  async getUsers()
  { 
    return this.usersService.FindAll();
  }


  @Get(':userName')
  async getUser(@Param() params: {userName: string})
  {
    const user = await this.usersService.FindOne(params.userName);
    console.log(user);
    
    if(user == null)
    {
      return `Пользователя с именем = ${params.userName} не найдено`;
    }
     
    return this.usersService.FindOne(params['firstName']);
  }


  @Post()
  @HttpCode(201)
  async createUser(@Body() userDtoAdd: CreateRequest, @Res() response: Response)
  {
    const res = await this.usersService.Create(userDtoAdd);

    if(res instanceof CreateResponseFail ||  res instanceof ErrorResponse)
    {
      response.status(HttpStatus.BAD_REQUEST).send(res);   
      
      return; 
    }
    
    response.send(res);
  }

}