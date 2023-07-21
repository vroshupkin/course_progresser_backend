import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, Interval } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { InjectBot } from 'nestjs-telegraf';
import { User } from '../users/users.schema';
import { Context, Telegraf }from 'telegraf';
import { ChatId } from './notify.schema';

@Injectable()
export class NotifyService
{
  @InjectModel(User.name)
  private userModel: Model<User>;
  
  @InjectModel(ChatId.name)
  private chatIdModel: Model<ChatId>;
  
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>
    
  )
  {
        
  }

  async SendMessage(chat_id: string, message: string)
  {
    await this.bot.telegram.sendMessage(chat_id, message);
  }
  
  @Interval(10000)
  async NotifyUser()
  {
    // console.log(new Date(Date.now()));

    // await this.SendMessage('1254478782', new Date(Date.now()) + '');
    
    
  }

  async RegisterChatId(userName: string, chatId: string)
  {
    const user = await this.userModel.findOne({ userName: userName });
    if(user == null)
    {
      throw new NotFoundException();
    }
    
    const find_chatId = await this.userModel.findOne({ _id: user.id });

    if(find_chatId != null)
    {
      console.log(find_chatId);
    }

    const findedUser = await this.chatIdModel.findOne({ user: user.id });

    if(findedUser == null)
    {
      const createChatId = new this.chatIdModel({ chatId: chatId, user: user.id });
      await createChatId.save();
    }
    else
    {
      findedUser.chat_id = chatId;
      await findedUser.save();
      
    }
    
    
    return;
  }


}