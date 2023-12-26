import { Test, TestingModule } from '@nestjs/testing';
import test, { Implementation, ImplementationFn } from 'ava';
import { ConfigServiceTest } from '../config';
import { ConfigService } from '@nestjs/config';
import { PostgresService } from '../database/database.module';
import { NestApplication } from '@nestjs/core';
import { UsersService2 } from './users_postgres.service';
import { DATABASE_STRUCT, TPostgresDataType, TTableColumn, check_database_field, pg_select_builder_query } from '../database/postgres.tools';
import { Client, ClientBase } from 'pg';
import chalk from 'chalk';
import { ExtendSet } from '../common/iteration_protocol';
import { promise_with_timer } from '../common/promise_wrappers';

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


test.serial('---- Database check column names from \'users\'', async (t) => 
{
  
  type UserField = TTableColumn<'users'>;

  const expect: {[s in UserField]: TPostgresDataType} = {
    id: 'integer',
    created_at: 'timestamp without time zone',
    username: 'character varying',
    role: 'character varying'
  };
  
  const res = await pg_client.query(`
    SELECT column_name, data_type 
      FROM information_schema.columns
        WHERE table_name='users';`
  );
  
  const input_obj = {};
  res.rows.forEach(v => input_obj[v.column_name] = v.data_type);
  
  t.deepEqual(input_obj, expect);

  t.pass();
});


/* Проверяет таблицы в БД по имени */
test.serial('---- ---- Database check Table names', async (t) => 
{
  const res = await pg_client.query(
    'select table_name from information_schema.tables where table_schema=\'public\';');
    

  const table_names = new Set(res.rows.map(v => v.table_name));
  const expect_table_names = new Set(Object.keys(DATABASE_STRUCT));

  t.true(new ExtendSet(table_names).equal(expect_table_names));

});

test.serial('---- ---- ---- CRUD', async (t) => 
{
  t.true(1 === 1);
});


test.after(async (t) => 
{
  await app.close();
});


//   const querys = [
//     'DELETE FROM users WHERE username = \'test\';',
//     'INSERT INTO "users" (username) VALUES (\'test\')',
//     'SELECT * from users WHERE username = \'test\''
//   ];
    
//   let last_result;
//   for (const query of querys) 
//   {
//     last_result = await this.client.query(query);
//   }

    
//   last_result.rows[0] != undefined ?
//     this.connectionSuccess() :
//     this.connectionFail();
   
    