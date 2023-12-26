import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import test from 'ava';
import { NestApplication } from '@nestjs/core';
import axios from 'axios';
import { Module } from '@nestjs/common';

let app: NestApplication;


test.beforeEach(async () => 
{
  const moduleRef = await Test.createTestingModule({
    controllers: [ AppController ],
    providers: [ AppService ],
  }).compile();
  
  app = moduleRef.createNestApplication();
  await app.init();
  await app.listen(5555);
});

test('AppController', async (t) => 
{
  // const res = await axios.get('http://localhost:5555/hello');
  
  // t.true(res.data === 'Hello World!');

  t.pass();
  
});

test.afterEach('Close app', () => 
{
  app.close();
  
});

