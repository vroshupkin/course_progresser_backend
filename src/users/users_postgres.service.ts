import { Injectable, Inject } from '@nestjs/common';
import { PostgresService } from '../database/database.module';

@Injectable()
export class UsersService2
{
  constructor(@Inject(PostgresService) private postgresService: PostgresService)
  {
    // this.getUserByName('user');
    
  }


  async getUserByName(username: string)
  {
    // const result = await this.postgresService.client.query(`SELECT * from "users" where username='${username}';`);
    
    const table = 'users';
    const query = `select column_name from information_schema.columns where table_name='${table}';`;
    const result = await this.postgresService.client.query(query);
    
    
    // console.log(result);
    // Если находит пользователя с именем username, то возвращает его, иначе null

    return result.rows ?? null;
    
  }

  addUser(username: string, password: string)
  {
    console.log('TODO');
  // Регистрирует пользователя с именем пользователя username и паролем password
  }


  editUserByUsername(username: string, fields: any)
  {
    console.log('TODO');
  // Находит пользователя по username и изменяет его значение так же как в поле fields
  } 

  deleteUserByUsername(username: string)
  {
    console.log('TODO');
  // Удаляет пользователя по его имени
  }
}