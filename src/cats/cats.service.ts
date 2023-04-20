import { Injectable } from '@nestjs/common';
import { Cat } from 'src/interfaces/cat.interface';
import { CreateCatDto } from './dto';

@Injectable()
export class CatsService 
{
  private readonly cats: Cat[] = [];

  create(dto: CreateCatDto)
  {
    this.cats.push(dto);
  }

  findAll(): Cat[] 
  {
    return this.cats;
  }
}
