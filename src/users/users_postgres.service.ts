import { Injectable, Inject } from '@nestjs/common';
import { PostgresService } from '../database/database.module';
import { TTableColumn } from '../database/postgres.tools';
import { QueryBuilder as QB } from '../common/query_builder';
  

@Injectable()
export class UsersService2
{
  constructor(@Inject(PostgresService) private postgresService: PostgresService)
  {
    // this.getUserByName('user');
    
  }

  /**
   * 
   * @param username Имя пользователя
   * @param column_names Колонки в таблице "users"
   * @returns null or user
   */
  async getUserByName(
    username: string,
    column_names: (TTableColumn<'users'>)[] = [ 'username' ])
  {    
    
    const query_str = QB.select('users', column_names, `username='${username}'`);

    const result = await this.postgresService.client.query(query_str);

    return result.rows[0] ? result.rows[0] : null;
    
  }

  async addUser(username: string)
  {  
  // Регистрирует пользователя с именем пользователя username и паролем password
    const query_str = QB.insert(
      {
        table_name: 'users',
        columns: [ 'username' ],
        values: [ username ],
      }
    );
      
    let result;
    try
    {
      result = await this.postgresService.client.query(query_str);
    }
    catch(err)
    {
      console.error(err);
      
      return null;
    }
    
    return result.rows[0] ? result.rows[0] : null;

  }


  editUserByUsername(username: string, fields: any)
  {
    console.log('TODO');
  // Находит пользователя по username и изменяет его значение так же как в поле fields
  } 

  /**
    * Delete user by name
    */
  async deleteUserByUsername(username: string): Promise<null | true>
  {
    const query = QB.delete({
      table: 'users',
      where_condition: `users.username='${username}'`
    });

    try
    {
      await this.postgresService.client.query(query);
    }
    catch(err)
    {
      console.error(err);
      
      return null;
    } 

    return true;
  }
}