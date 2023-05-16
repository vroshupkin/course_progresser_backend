import mongoose, { Model, Document } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { CreateRequest, CreateResponseError, CreateResponseErrorUserExist, CreateResponseFail, CreateResponseSuccess, UpdateUserDto } from './user.dto';
import { InEqValidator, validateDocument } from 'src/common/validators';
import { Error } from 'mongoose';
import { GreaterThanValidator, LessThanValidator } from 'src/common/validator_error';


@Injectable()
export class UsersService
{
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  )
  {
      
  }

  async Create(request: CreateRequest) 
  {
    const isUserFind = await this.FindOne(request.userName) != null;

    if(isUserFind)
    {
      throw new BadRequestException('Пользователь найден');
    }

    const createUser = new this.userModel(request);
    const schemaValidate = await validateDocument(createUser);
    if(schemaValidate.length > 0)
    {
      throw new BadRequestException(schemaValidate);
    }

    if(createUser.password.length < 6 || createUser.password.length > 32)
    {
      throw new BadRequestException('Пароль должен быть больше 6 символов и меньше 32');
    }
    
    await createUser.save();
    
    return;
    
  }

  async FindAll() 
  {
    return this.userModel.find().exec();
  }


  async FindOne(userName: string) 
  {
    const res = this.userModel.findOne({ userName: userName });
    
    return  res;
  }

  async Update(updateUserDto: UpdateUserDto): Promise<any>
  {
    const res = this.userModel.updateOne({ userName: updateUserDto.userName }, updateUserDto);
    
    return res;
  }
  
}

