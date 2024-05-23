import { NestApplication } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import test from 'ava';
import { PostgresService } from '../database/database.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { config } from '../config';

let app: NestApplication;
let moduleRef: TestingModule;
const [ username, password ] = [ 't', 'test' ];

test.before(async (t) => 
{
  moduleRef = await Test.createTestingModule({
    providers: [ 
      PostgresService,
      AuthService,
      UsersService,
    ],

    imports: [
      JwtModule.register({
        global: true,
        secret: config.jwt_secret,
        signOptions: { expiresIn: '45m' }
      })
    ]

  }).compile();

  
  app = moduleRef.createNestApplication();
  
  
  app.get(PostgresService).connect();
  await app.get(UsersService).delete(username);
  await app.get(UsersService).create({ username: username, password });

  
});


test.serial('Get token signIn', async (t) => 
{   
  const token = await app.get(AuthService).signIn({ username, password });
    
  t.true(token.length > 0);
});

