import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { UserDtoAdd } from './user.dto';

@Injectable()
export class UsersService
{
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  )
  {
    console.log(this.userModel);
  }

  async create(dto: UserDtoAdd) 
  {
    console.log(dto);
    const createUser = new this.userModel(dto);
    
    
    console.log(createUser.schema);
    
    return createUser.save();
  }

  async findAll() 
  {
    return this.userModel.find().exec();
  }


  async findOne(firstName: number) 
  {
    return this.userModel.find({ firstName: firstName }).exec();
  }

}


