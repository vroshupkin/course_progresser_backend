import { Module } from '@nestjs/common';
import { User, UserSchema } from './users.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule }  from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [ MongooseModule.forFeature([ { name: User.name, schema: UserSchema } ]), MulterModule ],
  controllers: [ UsersController ],
  providers: [ UsersService ],
  exports : [ UsersService,  MongooseModule.forFeature([ { name: User.name, schema: UserSchema } ]) ]
})
export class UsersModule 
{}
