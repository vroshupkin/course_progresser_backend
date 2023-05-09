import { Module } from '@nestjs/common';
import { NotifyUpdate } from './notify.update';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';


@Module(
  {
    imports: [],
    providers: [ NotifyUpdate, NotifyService ],
    controllers: [ NotifyController ]
  }
)
export class NotifyModule
{

}