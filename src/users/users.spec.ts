import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import test from 'ava';
import { Client } from 'pg';
import { PostgresService } from '../database/database.module';
import { DATABASE_STRUCT } from '../database/postgres.tools';
import { UsersService2 } from './users_postgres.service';


let app: NestApplication;
let moduleRef: TestingModule;
let pg_client: Client;
let user_service2: UsersService2;


test.before(async (t) => 
{
  moduleRef = await Test.createTestingModule({
    providers: [ 
      // { useClass: ConfigServiceTest, provide: ConfigService },
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
 
  // const toLowerCase = (str: string) => str.toLowerCase();

  const where_condition = Object.keys(DATABASE_STRUCT)
    .map(str => str.toLowerCase())
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

test.serial('CRUD user', async (t) => 
{
  
  const username = 'new User 1';

  await user_service2.deleteUserByUsername(username);
  await user_service2.addUser(username);
  const user = await user_service2.getUserByName(username, [ 'username' ]);
  
  t.true(user.username === username);
  
  await user_service2.deleteUserByUsername(username);
  const deleted_user = await user_service2.getUserByName(username, [ 'username' ]);
  t.true(deleted_user === null);
  
});


test.after(async (t) => 
{
  await app.close();
});


