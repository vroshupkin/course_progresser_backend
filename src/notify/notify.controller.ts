import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Public } from '../auth/auth.decorators';
import { NotifyService } from './notify.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotifyRegisterDto, NotifyReqDto } from './notify.dto';


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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Отправляет в телеграмм бот сообщение пользователю chat_id' })
  sendMessage(@Body() body: NotifyReqDto)
  {
    this.notify_service.SendMessage(body.chat_id, body.message);
  }

  @Post('register')
  @Public()
  @HttpCode(201)

  @ApiOperation({ summary: 'Регистрирует пользователя по chat_id в приложении' })
  async Register(@Body() body: NotifyRegisterDto)
  {
    const log = 'service';
    const out = await this.notify_service.RegisterChatId(body.userName, body.chat_id);

    return {
      service: log,
      out: out
    };
  }
}