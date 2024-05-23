import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Inject, Param, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { Public } from '../auth/auth.decorators';
import { AdminGuard } from '../auth/auth.guard';
import { CreateDto, DeleteDto, GetUserDto, GetUserResponseDto } from './user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')


export class UsersController
{
  constructor(@Inject(REQUEST) private request, private usersService: UsersService)
  {}

  @Get('all')
  @ApiBearerAuth()
  async getUsers()
  { 

    return this.usersService.findAll();
  }


  @Get('getUser')
  
  @ApiOperation({ summary: 'Возвращает данные пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: GetUserResponseDto })
  @ApiParam({ name: 'userName', required: true, description: 'Имя пользователя' })
  @ApiBearerAuth()
  // TODO сделать что то с валидатором param. Если не приходит параметр то падает контроллер
  async getUser(@Param('userName') param: GetUserDto)
  {
    // console.log(param);
    
    if(param)
    {
      const user = await this.usersService.getUser(param.userName);
      if(user)
      {
        return user;    
      }
      else
      {
        return `Пользователя с именем = ${param.userName} не найдено`;
      }
    }

    return 'ERROR';
    
  }


  @Post('register')
  @HttpCode(201)
  @Public()

  @ApiOperation({ summary: 'Регистрирует нового пользователя' })
  async register(@Body() userDtoAdd: CreateDto)
  {
    return await this.usersService.create(userDtoAdd); 
  }

  
  @Delete('delete')
  @HttpCode(200)
  @Public()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()

  @ApiOperation({ summary: 'Удаляет пользователя' })
  async delete(@Body() deleteDto: DeleteDto)
  { 
    const res = await this.usersService.delete(deleteDto.userName);

    if(res === 0)
    {
      return `Пользователь с именем "${deleteDto.userName}" не найден`;  
    }
    
    return 'ok';
  }

  @Post('upload-avatar')

  @UseInterceptors(FileInterceptor('file'))

  @HttpCode(202)

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Загружает аватар пользователя' })
  async uploadAvatar(@UploadedFile() file: Express.Multer.File,  @Req() req: Request, @Res({ passthrough: true }) res: Response)
  {
    if(file)
    {      
      this.usersService.uploadAvatar(file, req.body.userName);    

      return 'ok';
    }

    return 'error';
    
  }


  @Get('get-avatar_*')

  @HttpCode(200)
  @ApiBearerAuth()

  @ApiOperation({ summary: 'Получает аватар пользователя' })
  @Header('Content-Type', 'image/jpg')
  async getAvatar(@Param() param: {userName: string}, @Res() res: Response, @Query() query) 
  {

    res.set('Content-Type', 'image/jpg');
    
    const formats = [ 'jpg', 'png', 'jpeg' ] as const;
    const fileList = formats
      .map(format => `uploads/${param[0]}.${format}`)
      .filter(fileName => fs.existsSync(fileName))
    ;

    // TODO вынести в сервис
    if(fileList.length >= 1)
    {
      const file = fs.createReadStream(`${fileList[0]}`);
      file.pipe(res);
    }
    else if(fileList.length === 0)
    {
      // console.log('error!');
      res.status(404);
      
      return 'Image don\'t find';
    }

    
    return 'ok';
  }
  
  
}
