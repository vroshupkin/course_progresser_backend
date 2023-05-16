import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';
import { CatsController } from './cats/cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose'; 
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { TimersController } from './timers/timers.controller';
import { TimersService } from './timers/timers.service';
import { TimersModule } from './timers/timers.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { NotifyUpdate } from './notify/notify.update';
import * as LocalSession from 'telegraf-session-local';
import { NotifyModule } from './notify/notify.module';
import { ScheduleModule } from '@nestjs/schedule';


const sessions = new LocalSession({ database: 'session_db.json' });
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/progresser'),
    ConfigModule.forRoot(),
    TimersModule
  ],
  controllers: [ TimersController ],
  providers: [ TimersService ],
  
})
export class DatabaseModule
{}


@Module({
  imports: [ 
    CatsModule,
    DatabaseModule,
    UsersModule,
    AuthModule , 
    TelegrafModule.forRoot({
      middlewares: [ sessions.middleware() ],
      token: new ConfigService().get('TELEGRAM_TOKEN')
    }),
    NotifyModule,
    ScheduleModule.forRoot()
  ],
  providers: [
    // Global guard!
    { provide: APP_GUARD, useClass: AuthGuard },
  ] 
})
export class AppModule 
{}
