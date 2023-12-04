import mongoose, { Model, Document } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { CreateDto,  UpdateUserDto } from './user.dto';
import * as fs from 'fs';
import { get_file_extension } from '../common/get_file_extension';
import { validateDocument } from '../common/validators';
import { PostgresService } from '../database/database.module';
import { faker } from '@faker-js/faker';
import { createHash } from 'node:crypto';
import { create } from 'domain';
import * as chalk from 'chalk';

@Injectable()
export class UsersService
{
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private pgService: PostgresService
  )
  {
    this.async_init();
  }

  async async_init()
  {
    // const username = faker.internet.userName();
    
    // await this.pgService.client.query(`INSERT INTO "users" (username) VALUES ('${username}');`);
    // const res = await this.pgService.client.query('SELECT * FROM "users"');
    // console.log(res.rows);

    console.log(await this.addUser('Hello epta', 'parol_epta'));

  }

  async Create(request: CreateDto) 
  {
    const isUserFind = await this.FindOne(request.userName) != null;

    if(isUserFind)
    {
      throw new BadRequestException('Пользователь с таким именем уже существует');
    }


    const createUser = new this.userModel(request);
    createUser.role = 'user';
    
    const schemaValidate = await validateDocument(createUser);
    
    if(schemaValidate.length > 0)
    {
      throw new BadRequestException(schemaValidate);
    }

    if(createUser.password.length < 6 || createUser.password.length > 32)
    {
      throw new BadRequestException('Пароль должен быть больше 6 символов и меньше 32');
    }
    
    await createUser.save();
    
    return;
    
  }

  async FindAll() 
  {
    return this.userModel.find().exec();
  }


  async FindOne(userName: string) 
  {
    const res = this.userModel.findOne({ userName: userName });
    
    
    return  res;
  }

  async Update(updateUserDto: UpdateUserDto)
  {
    const res = this.userModel.updateOne({ userName: updateUserDto.userName }, updateUserDto);
    
    return res;
  }

  async Delete(userName: string)
  {
    const res = this.userModel.deleteOne({ userName });
    
    return res;
  }

  async GetRole(userName: string)
  {
    const res = await this.userModel.findOne({ userName });

    if(res == null)
    {
      return null;
    }
    
    return res.role;
  }
  
  /**
 * Получает пользователя со всеми полями
 */
  async getUser(username?: string)
  {
    const query = 'SELECT * from "users"' + (username != undefined? `WHERE username =${username}` : '');
    
    return await this.pgService.client.query(query);
  }

  /**
 * Получает пользователя со всеми полями
 */
  async addUser(username: string, password: string)
  {

    password += 'Hrani sol taino!';

    const new_password = createHash('sha256').update(password).digest('hex');
    

    // @ts-ignore
    const user_server_tittle  = [ chalk.green, chalk.bgBlack ].reduce((fn) => fn('UserSerivce addUser()\n'));

    const message = user_server_tittle + chalk.redBright(new_password);
    console.log(message);
    // return await this.pgService.client.query(query);
  }

  UploadAvatar(file: Express.Multer.File, userName: string)
  {
    if(file)
    {
      if(!fs.existsSync('uploads')) 
      {
        fs.mkdirSync('uploads');        
      }

      const file_extension = get_file_extension(file.originalname);
      const fileName = `${userName}.${file_extension}`;
      fs.writeFileSync(`uploads/${fileName}`, file.buffer);

      
    }
  }

  async GetAvatar(userName: string)
  {
    
  }
  
}

