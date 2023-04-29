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
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/progresser'),
    ConfigModule.forRoot()
  ],
  
})
export class DatabaseModule
{}


@Module({
  imports: [ CatsModule, DatabaseModule, UsersModule, AuthModule ] 
})
export class AppModule 
{}
