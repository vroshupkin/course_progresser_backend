import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDtoAdd } from './user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController
{
  constructor(private usersService: UsersService)
  {}

  @Get('all')
  async getUsers()
  { 
    return this.usersService.findAll();
  }


  @Get(':firstName')
  async getUser(@Param() params: any)
  {
    
    const user = await this.usersService.findOne(params['firstName']);
    console.log(user);
    
    if(user == null)
    {
      return `Пользователя с именем = ${params.firstName} не найдено`;
    }
     

    return this.usersService.findOne(params['firstName']);
  }


  @Post()
  @HttpCode(201)
  async createUser(@Body() userDtoAdd: UserDtoAdd, @Res() response: Response)
  {
    const res = await this.usersService.create(userDtoAdd);

    if(res.length != 0)
    {
      response.status(HttpStatus.BAD_REQUEST).send(res);   
    }
    
    response.send('Пользователь создан');
  }

}