import { Test, TestingModule } from '@nestjs/testing';
import test, { Implementation, ImplementationFn } from 'ava';
import { ConfigServiceTest } from '../config';
import { ConfigService } from '@nestjs/config';
import { PostgresService } from '../database/database.module';
import { NestApplication } from '@nestjs/core';
import { UsersService2 } from './users_postgres.service';
import { DATABASE_STRUCT, TPostgresDataType, TTableColumn, check_database_field, pg_select_builder_query } from '../database/postgres.tools';
import { Client, ClientBase } from 'pg';

import { ExtendSet } from '../common/iteration_protocol';
import { promise_with_timer } from '../common/promise_wrappers';
import { table } from 'console';

let app: NestApplication;
let moduleRef: TestingModule;
let pg_client: Client;
let user_service2: UsersService2;


test.before(async (t) => 
{
  moduleRef = await Test.createTestingModule({
    providers: [ 
      { useClass: ConfigServiceTest, provide: ConfigService },
      UsersService2,
      PostgresService
    ]
  }).compile();

  
  app = moduleRef.createNestApplication();
  // app.enableShutdownHooks();

  
});

test.serial('Database connection', async (t) => 
{
  
  await app.init();
  
  pg_client = app.get(PostgresService).client;
  user_service2 = app.get(UsersService2);

  t.pass();
});


test.serial('Database check column names ', async (t) => 
{
 
  const toLowerCase = (str: string) => str.toLowerCase();

  const where_condition = Object.keys(DATABASE_STRUCT)
    .map(toLowerCase)
    .map(table_name => `table_name='${table_name}'`).join(' OR ');

  
  const res = await pg_client.query(`
    SELECT column_name, data_type, table_name 
      FROM information_schema.columns
        WHERE ${where_condition}`
  );

  const actual = {};
  res.rows.forEach(obj => 
  {    
    const { column_name, data_type, table_name } = obj;

    if(!actual[table_name])
    {
      actual[table_name] = {};
    }
    
    actual[table_name][column_name] = data_type;
  });
  
  
  t.deepEqual(actual, DATABASE_STRUCT);
  
  
});


/* Проверяет таблицы в БД по имени */
test.serial('Database check table names', async (t) => 
{
  const res = await pg_client.query(
    'SELECT table_name from information_schema.tables WHERE table_schema=\'public\';');
    

  const sets = {
    actual: new Set(res.rows.map(v => v.table_name)),
    expect: new Set(Object.keys(DATABASE_STRUCT).map(str => str.toLowerCase()))
  };

  t.deepEqual(sets.actual, sets.expect);

});

test.serial('CRUD', async (t) => 
{
  t.true(1 === 1);
});


test.after(async (t) => 
{
  await app.close();
});

