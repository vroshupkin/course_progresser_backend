import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';
import { CatsController } from './cats/cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersHttpModule } from './users/users-http.module';
import { UsersController } from './users/users.controller';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose'; 


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/progresser')
  ],
  
})
export class Database
{}


@Module({
  imports: [ CatsModule, Database, UsersModule ] 
})
export class AppModule 
{}
