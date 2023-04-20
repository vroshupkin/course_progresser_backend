import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDtoAdd } from './user.dto';


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
  async createUser(@Body() userDtoAdd: UserDtoAdd)
  {

    console.log(userDtoAdd);
    await this.usersService.create(userDtoAdd);

  }

}