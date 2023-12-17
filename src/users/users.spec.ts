import { Test, TestingModule } from '@nestjs/testing';
import test from 'ava';
import { ConfigServiceTest } from '../config';
import { ConfigService } from '@nestjs/config';
import { PostgresService } from '../database/database.module';
import { NestApplication } from '@nestjs/core';
import { UsersService2 } from './users_postgres.service';
import { DATABASE_STRUCT, TPostgresDataType, TTableColumn, check_database_field, pg_select_builder_query } from '../database/postgres.tools';
import { SetOperation } from '../common/iteration_protocol';
import { Client, ClientBase } from 'pg';
import chalk from 'chalk';

let app: NestApplication;
let moduleRef: TestingModule;
let pg_client: Client;
let user_service2: UsersService2;

test.before(async () => 
{
  moduleRef = await Test.createTestingModule({
    providers: [ 
      { useClass: ConfigServiceTest, provide: ConfigService },
      UsersService2,
      PostgresService
    ]
  }).compile();

  app = moduleRef.createNestApplication();
  
  await app.init();
  await app.get(PostgresService).init();

  pg_client = await app.get(PostgresService).client;
  user_service2 = app.get(UsersService2);
});

test('CRUD', async (t) => 
{

  // const user_service = await app.resolve(UsersService2);
  
  // console.log(await user_service2.getUserByName('Alex31'));

  t.true(1 === 1);
  // t.pass();


});

test('Database integrity. Check column names from \'users\'', async (t) => 
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

});

/* Проверяет таблицы в БД по имени */
test('Database integrity. Table names', async (t) => 
{
  const res = await pg_client.query(
    'select table_name from information_schema.tables where table_schema=\'public\';');
    

  const table_names = new Set(res.rows.map(v => v.table_name));
  const expect_table_names = new Set(Object.keys(DATABASE_STRUCT));

  t.true(SetOperation(table_names, '==', expect_table_names));

});

test.after(async () => 
{
  await moduleRef.close();
  await app.close();
  await pg_client.end();
  
});

// test.after(async () => 
// {
//   console.log('B');
//   // console.log(app);
//   try
//   {
//     await pg_client.end();
//   }
//   catch(e)
//   {
//     console.log(e);
//   }
  
  
//   console.log(chalk.green('This is the end'));
// });


// test()
// describe('UsersController', () => 
// {
//   let app: INestApplication;

//   beforeAll(async () => 
//   {
//     const moduleRef = await Test.createTestingModule({
//       imports: [ UsersModule, DatabaseModule, AuthModule ]
//     })
//       .overrideProvider(AuthGuard)
//       .useClass(MockAuthGuard)
//       .compile();

//     app = moduleRef.createNestApplication();

//     await app.init();
        
//   });

//   it('/GET users', () => 
//   {
//     return request(app.getHttpServer())
//       .get('/users/all')
//       .expect(200);
//   });

//   // Для тестирование требуется чтобы было изображение /uploads/admin.jpg
//   it('/GET avatar', async () => 
//   {

//     const http = app.getHttpServer();
    
//     const res = await request(http).get('/users/get-avatar_admin');

//     expect(res.statusCode).toBe(200);
    
//   });

//   it('/POST avatar', async () => 
//   {
//     const http = app.getHttpServer();

//     if(fs.existsSync('uploads/admin.jpg'))
//     {
//       const file = fs.readFileSync('uploads/admin.jpg');

//       const options = {
//         headers: {
//           'Content-Type': 'image',
//           'Content-Length': file.byteLength,
//         },
//       };


//       const res = await request(http)
//         .post('/users/upload-avatar')
//         .set(options.headers)
//         .attach('file', file);
        
//       expect(res.statusCode).toBe(202);

//     }

    
//   });


//   afterAll(async () => 
//   {
//     await app.close();
//   });


// });
