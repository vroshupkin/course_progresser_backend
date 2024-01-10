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
  }
  
  async onApplicationBootstrap()
  {
    
    try
    {
      await this.connect();
    }
    catch(err)
    {
      console.error(err);
    }
  }
  
  /**
   * Подключение
   */
  async connect()
  {
    this.client = new Client(this.options);
    try
    {
      await this.client.connect();  
      this.connectionSuccess();
      
    }
    catch(err)
    {
      console.error(err);
      this.connectionFail();
    }
    
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
    const adress = chalk.yellowBright(`${host}:${port}`);
    
    console.log(postgres + ne_ydalos + s_database, adress);
    
  }

  onModuleDestroy()
  {
    this.client.end();
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

