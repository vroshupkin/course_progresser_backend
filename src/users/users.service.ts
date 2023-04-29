import { Model, Document } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { CreateRequest, CreateResponseError, CreateResponseErrorUserExist, CreateResponseFail, CreateResponseSuccess } from './user.dto';
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
    
    if(await this.FindOne(request.userName) != null)
    {
      return new CreateResponseErrorUserExist();
    }

    const createUser = new this.userModel(request);
    const schemaValidate = await validateDocument(createUser);
    const isSchemaValidate = schemaValidate.length == 0;

    if(!isSchemaValidate)
    {
      return isSchemaValidate;
    }

    if(createUser.password.length < 6 || createUser.password.length > 32)
    {
      throw new BadRequestException('Пароль должен быть больше 6 символов и меньше 32');
    }
    
    createUser.save();
    const findUser = await this.FindOne(createUser.userName);

    
    if(findUser == null)
    {
      return new CreateResponseError();    
    }
    
    return new CreateResponseSuccess();      
    
    
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

  
}

