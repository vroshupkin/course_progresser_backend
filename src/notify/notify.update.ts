import { Body, Controller, Post } from '@nestjs/common';
import { Request } from 'express';
import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Public } from '../auth/auth.decorators';
import { Telegraf, Context } from 'telegraf';
import { NotifyService } from './notify.service';

@Update()
export class NotifyUpdate 
{  
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private notifyService: NotifyService
  )
  {
        
  }

  @Start()
  @Public()

  async startCommand(ctx: Context)
  {
    await ctx.reply(ctx.message.chat.id + ''); 

    // await this.notifyService.SendMessage('1254478782', 'hello');
    // console.log(ctx);
    // console.log(ctx.message);

    
  }
} 
