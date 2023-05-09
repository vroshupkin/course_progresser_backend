import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf }from 'telegraf';

@Injectable()
export class NotifyService
{
  constructor(@InjectBot() private readonly bot: Telegraf<Context>)
  {
        
  }

  async SendMessage(chat_id: string, message: string)
  {
    await this.bot.telegram.sendMessage(chat_id, message);
  }
    
}