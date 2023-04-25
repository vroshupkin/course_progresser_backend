import { Body, Controller, Get, Param, Post, Query, Redirect, Req } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Request } from 'express';
import { CreateCatDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cats')
@Controller('cats')
export class CatsController 
{
  constructor(private catsService: CatsService)    
  {

  }
    
  @Get()
  findAll(@Req() request: Request): string 
  {
    
    return 'This is CATS!';
  }

     @Post()
  async create(@Body() createCatDto: CreateCatDto)
  {
    this.catsService.create(createCatDto);
  }

  // Если ничего не возвращается то переносит на 'https://docs.nestjs.com'
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
     getDocs(@Query('version') version)
     {

       if(version == 5)
       {
         return { url: 'https://docs.nestjs.com/v5/' };
       }


     }

  @Get(':id')
  findOne(@Param() params: any): string
  {
    console.log(params);
    
    return `This action returns a #${params.id} cat`;
  }
}
