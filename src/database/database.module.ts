import { Injectable, Module } from '@nestjs/common';
import { Client } from 'pg';
import * as chalk from 'chalk';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from '../config';

@Injectable({})
export class PostgresService
{
  public client: Client;

  private options = {
    port: config.postgres.port, 
    host: config.postgres.host,
    database: 'calories',
    user: 'admin',
    password: 'qwerty'
  };

  constructor()
  { 
    
    this.connect();
  }
  
  /**
   * Подключение
   */
  async connect()
  {
    this.client = new Client(this.options);
    await this.client.connect();
    
    await this.client.query('-- INSERT INTO "users" (username) VALUES (\'hello\')');

    const querys = [
      'DELETE FROM users WHERE username = \'test\';',
      'INSERT INTO "users" (username) VALUES (\'test\')',
      'SELECT * from users WHERE username = \'test\''
    ];
    
    let last_result;
    for (const query of querys) 
    {
      last_result = await this.client.query(query);
    }


    last_result.rows[0] != undefined ?
      this.connectionSuccess() :
      this.connectionFail();
   
    
  }

  private connectionSuccess()
  {
    const { database, host, port } = this.options;
   
    const postgres = chalk.greenBright('POSTGRES: ');
    const ydalos = chalk.whiteBright('Соединение с базой данной ');
    const s_database = chalk.blueBright(database);
    const adress = chalk.yellowBright(` ${host}: ${port}`);
    
    console.log(postgres + ydalos + s_database + adress);
  }

  private connectionFail()
  {
    const { port, host, database } = this.options;

    const postgres = chalk.redBright('POSTGRES: ');
    const ne_ydalos = chalk.whiteBright('Не удалось соединиться с СУБД и базой данных ');
    const s_database = chalk.blueBright(database);
    const adress = chalk.yellowBright(`${host}: ${port}`);
    
    console.log(postgres + ne_ydalos + s_database, adress);
    
  }
}


@Module({
  imports : [ MongooseModule.forRoot(config.mongo_host) ],
  providers: [ PostgresService ],
  exports: [ PostgresService ]
  
})
export class DatabaseModule
{
  constructor()
  {
    console.log('DatabaseModule has builded!');
  }
  

}

