import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Public } from 'src/auth/auth.decorators';
import { NotifyService } from './notify.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotifyReqDto } from './notify.dto';


@Controller('notify')

@ApiTags('notify')
export class NotifyController
{
  constructor(private notify_service: NotifyService)
  {
    
  }

  @Post('')
  @Public()
  @HttpCode(201)

  @ApiOperation({ summary: 'Отправляет в телеграмм бот сообщение пользователю chat_id' })
  sendMessage(@Body() body: NotifyReqDto)
  {
    this.notify_service.SendMessage(body.chat_id, body.message);
  }

  @Post('register')
  @Public()
  @HttpCode(201)

  // @ApiOperation({ summary: 'Отправляет в телеграмм бот сообщение пользователю chat_id' })
  async Register(@Body() body: {chatId: string, userName: string})
  {
    const log = 'service';
    const out = await this.notify_service.RegisterChatId(body.userName, body.chatId);

    return {
      service: log,
      out: out
    };
  }
}