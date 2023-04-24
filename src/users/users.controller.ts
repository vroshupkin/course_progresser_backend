import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateResponseError, CreateResponseFail, CreateResponseSuccess, UserDtoAdd } from './user.dto';
import { Response } from 'express';
import { ErrorResponses } from 'src/common/common.types';

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
  async createUser(@Body() userDtoAdd: UserDtoAdd, @Res() response: Response)
  {
    const res = await this.usersService.Create(userDtoAdd);

    if(res instanceof CreateResponseFail ||  res instanceof ErrorResponses)
    {
      response.status(HttpStatus.BAD_REQUEST).send(res);   
      
      return; 
    }
    
    response.send(res);
  }

}