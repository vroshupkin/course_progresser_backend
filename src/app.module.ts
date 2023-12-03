import { Injectable, Module, Post } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

import { CatsModule } from './cats/cats.module';

import { AuthModule } from './auth/auth.module';
import { AdminGuard, AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { TelegrafModule } from 'nestjs-telegraf';

import * as LocalSession from 'telegraf-session-local';
import { NotifyModule } from './notify/notify.module';
import { ScheduleModule } from '@nestjs/schedule';
import { config } from './config';
import { MulterModule } from '@nestjs/platform-express/multer';

// import postgres from 'postgres';
const sessions = new LocalSession({ database: 'session_db.json' });


// Модуль для postgres базы данных
// @Injectable()

@Module({
  imports: [ 
    
    UsersModule,
    CatsModule,
    AuthModule, 
    DatabaseModule,

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
{
  constructor()
  {
    console.log('App module build!');
  }
}
