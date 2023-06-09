import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors, Scope, Inject, Query, Header } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateDto, CreateResponseError, CreateResponseFail, CreateResponseSuccess, DeleteDto, GetUserDto  } from './user.dto';
import { Response, query, request } from 'express';
import { ErrorResponse } from 'src/common/common.types';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiProperty, ApiQuery, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { curry } from 'ramda';
import { AdminGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/auth.decorators';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { REQUEST } from '@nestjs/core';
import * as fs from 'fs';
import { join } from 'path';

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

    return this.usersService.FindAll();
  }


  @Get('getUser')
  
  @ApiOperation({ summary: 'Возвращает данные пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: GetUserDto })
  @ApiParam({ name: 'userName', required: true, description: 'Имя пользователя' })
  @ApiBearerAuth()
  async getUser(@Param('userName') param: {userName: string})
  {
    const user = await this.usersService.FindOne(param.userName);
    
    if(user == null)
    {
      return `Пользователя с именем = ${param.userName} не найдено`;
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

  @Post('upload-avatar')

  @UseInterceptors(FileInterceptor('file'))

  @HttpCode(202)
  @ApiBearerAuth()

  @ApiOperation({ summary: 'Загружает аватар пользователя' })
  async uploadAvatar(@Body() body: {userName: string}, @UploadedFile() file: Express.Multer.File)
  {
    const error = this.usersService.UploadAvatar(file, body.userName);

    if(error instanceof Error)
    {
      return error;
    }
    
    return 'ok';
  }


  @Get('get-avatar/:userName')

  @HttpCode(200)
  @ApiBearerAuth()

  @ApiOperation({ summary: 'Получает аватар пользователя' })
  @Header('Content-Type', 'image/jpg')
  async getAvatar(@Param() param: {userName: string}, @Res() res: Response) 
  {

    res.set('Content-Type', 'image/jpg');
    
    const filePath = join(process.cwd(), `/uploads/${param.userName}.jpg`);

    let file: fs.ReadStream;
    try
    {
      file = fs.createReadStream(filePath);
      file.pipe(res);
    }
    // TODO сделать возврат ошибки
    catch(e)
    {
      console.log(e);
    }

    return 'ok';
  }
  
  
}
