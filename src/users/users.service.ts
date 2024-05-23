import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { get_file_extension } from '../common/get_file_extension';
import { PostgresService } from '../database/database.module';
import { CreateDto } from './user.dto';

@Injectable()
export class UsersService
{
  constructor(
    private pgService: PostgresService
  )
  {
    this.async_init();
  }

  async async_init()
  {
  }

  async create({ username, password }: CreateDto) 
  {    
    if(!username || !password)
    {
      throw new BadRequestException('Имя пользователя и пароль должен быть передан');
    }

    const isUserFind = await this.getUser(username) != null;

    if(isUserFind)
    {
      throw new BadRequestException('Пользователь с таким именем уже существует');
    }
 

    const query = `
      DO $$
        DECLARE
          id_val INTEGER;
          username_val VARCHAR = '${username}';
          password_val VARCHAR = '${password}';
        BEGIN
          INSERT INTO users (username) VALUES (username_val);

          SELECT id INTO id_val FROM users WHERE users.username = username_val;

          INSERT INTO usersauth (id, password) VALUES (id_val, password_val);
      END $$;`;

    this.pgService.client.query(query);

    return 'ok';
  }

  async updatePassword(username: string, password: string)
  {
    if(this.getUser(username) === null)
    {return;}

    const query = `
      DO $$
        DECLARE
          id_val INTEGER;
        BEGIN
          SELECT id INTO id_val FROM users WHERE users.username = ${username};
          UPDATE usersauth SET password = ${password} WHERE id = id_val;
      END $$;`;

    await this.pgService.client.query(query);

  }

  async findAll() 
  {
    const query = 'SELECT * FROM users';
    const res = await this.pgService.client.query(query);

    res.rows.map(v => 
    {
      const { username, id } = v;

      return { username, id };
    });
    
    return res.rows;
  }

  // TODO протестировать, отдает ли количество удаленных юзеров
  async delete(userName: string): Promise<number>
  {
    const res = await this.getUser(userName);
    if(!res)
    {
      return; 
    }
    const { id } = res;
    
    
    await this.pgService.client.query(`DELETE FROM usersauth WHERE id=${id}`);
    await this.pgService.client.query(`DELETE FROM users WHERE username='${userName}'`);
    
    
    // TODO заменить
    return 1;
  }

  async getRole(username: string)
  {
    const query = `SELECT role FRON users WHERE username=${username}`;
    const res = await this.pgService.client.query(query);
    
    if(res.rows[0])
    {
      return res.rows[0].role;
    }

    return '';

  }
  
  /**
 * Получает пользователя со всеми полями
 */
  getUser = async (username: string): Promise<{username: string, password: string, id: number} | null> =>
  {
    const query = `SELECT users.username, usersauth.password, users.id
      FROM users
      INNER JOIN usersauth ON usersauth.id = users.id
      WHERE users.username = '${username}';`;

    const res = await this.pgService.client.query(query);
    if(!res.rows[0]){return null;}

    const { password, id } = res.rows[0];  
  
    return { username, password, id };
  };
  
  /** Сохраняет токен в постгрес */
  async saveToken(user_id: number, token: string)
  {
    const query = `UPDATE usersauth SET token = '${token}' WHERE id='${user_id}'`;
    await this.pgService.client.query(query);
  }

  uploadAvatar(file: Express.Multer.File, userName: string)
  {
    if(!file){return;}
    
    if(!fs.existsSync('uploads')) 
    {
      fs.mkdirSync('uploads');        
    }

    const file_extension = get_file_extension(file.originalname);
    const fileName = `${userName}.${file_extension}`;
    fs.writeFileSync(`uploads/${fileName}`, file.buffer);
  }

  async GetAvatar(userName: string)
  {
    
  }
  
}

