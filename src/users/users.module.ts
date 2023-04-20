import { Module } from '@nestjs/common';
import { User, UserSchema } from './users.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule }  from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forFeature([ { name: User.name, schema: UserSchema } ]) ],
  controllers: [ UsersController ],
  providers: [ UsersService ],
})
export class UsersModule 
{}
