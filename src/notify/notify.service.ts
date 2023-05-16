import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, Interval } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { InjectBot } from 'nestjs-telegraf';
import { User } from 'src/users/users.schema';
import { Context, Telegraf }from 'telegraf';
import { ChatId } from './notify.schema.chat_id';

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
    
    console.log(user.userName);
    console.log(user.password);
    console.log(user.id);
    // const createChatId = new this.chatIdModel({ chatId: chatId, user: { userName: userName, password: user.password } });

    const find_chatId = await this.userModel.findOne({ _id: user.id });

    console.log(find_chatId);
    if(find_chatId != null)
    {
      console.log(find_chatId);
    }

    const createChatId = new this.chatIdModel({ chatId: chatId, user: user.id });
    
    createChatId.save();
    // const res = this.chatIdModel.updateOne({ user_model: user, chat_id: chatId });
    // console.log(res);
    
    return;
  }


}