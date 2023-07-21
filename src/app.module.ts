import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';

import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose'; 

import { AuthModule } from './auth/auth.module';
import { AdminGuard, AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { TimersController } from './timers/timers.controller';
import { TimersService } from './timers/timers.service';
import { TimersModule } from './timers/timers.module';
import { TelegrafModule } from 'nestjs-telegraf';

import * as LocalSession from 'telegraf-session-local';
import { NotifyModule } from './notify/notify.module';
import { ScheduleModule } from '@nestjs/schedule';
import { config } from './config';
import { MulterModule } from '@nestjs/platform-express/multer';


const sessions = new LocalSession({ database: 'session_db.json' });
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/progresser'),
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
      token: config.TELEGRAM_TOKEN
    }),
    NotifyModule,
    ScheduleModule.forRoot(),
    MulterModule.register({
      dest: './upload'
    })

    
    // ConfigModule.forRoot({ isGlobal: true })
  ],
  providers: [
    // Global guard!
    { provide: APP_GUARD, useClass: AuthGuard },
    AdminGuard
  ] 
})
export class AppModule 
{}
