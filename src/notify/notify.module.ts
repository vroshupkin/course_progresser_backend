import { Module } from '@nestjs/common';
import { NotifyUpdate } from './notify.update';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatId, ChatIdSchema } from './notify.schema';
import { User, UserSchema } from 'src/users/users.schema';
import { UsersModule } from 'src/users/users.module';


@Module(
  {
    imports: [
      MongooseModule.forFeature([
        { name: ChatId.name, schema: ChatIdSchema },
      ]),
      UsersModule
    ],

    providers: [ NotifyUpdate, NotifyService ],
    controllers: [ NotifyController ]
  }
)
export class NotifyModule
{

}