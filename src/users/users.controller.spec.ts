import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule, DatabaseModule } from '../app.module';
import { AuthGuard } from '@nestjs/passport';
import { CanActivate, INestApplication, Injectable } from '@nestjs/common';
import { UsersModule } from './users.module';
import { validateDocument } from '../common/validators';
import { AuthModule } from '../auth/auth.module';
import { MockAuthGuard } from '../mocks/mock.guard';
import * as fs from 'fs';


describe('UsersController', () => 
{
  let app: INestApplication;

  beforeAll(async () => 
  {
    const moduleRef = await Test.createTestingModule({
      imports: [ UsersModule, DatabaseModule, AuthModule ]
    })
      .overrideProvider(AuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    app = moduleRef.createNestApplication();

    await app.init();
        
  });

  it('/GET users', () => 
  {
    return request(app.getHttpServer())
      .get('/users/all')
      .expect(200);
  });

  // Для тестирование требуется чтобы было изображение /uploads/admin.jpg
  it('/GET avatar', async () => 
  {

    const http = app.getHttpServer();
    
    const res = await request(http).get('/users/get-avatar_admin');

    expect(res.statusCode).toBe(200);
    
  });

  it('/POST avatar', async () => 
  {
    const http = app.getHttpServer();

    if(fs.existsSync('uploads/admin.jpg'))
    {
      const file = fs.readFileSync('uploads/admin.jpg');

      const options = {
        headers: {
          'Content-Type': 'image',
          'Content-Length': file.byteLength,
        },
      };


      const res = await request(http)
        .post('/users/upload-avatar')
        .set(options.headers)
        .attach('file', file);
        
      expect(res.statusCode).toBe(202);

    }

    
  });


  afterAll(async () => 
  {
    await app.close();
  });


});
