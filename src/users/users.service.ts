import { Model, Document } from 'mongoose';
import { Injectable } from '@nestjs/common';
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
    if(schemaValidate.length > 0)
    {
      return schemaValidate;
    }

    const pass_len = createUser.password.length;
    const validator_res = 
    [       
      GreaterThanValidator(pass_len, 6)('Пароль должен быть больше 6 символов'),
      LessThanValidator(pass_len, 32)('Пароль должен быть меньше 32 символов'),
    ]
      .filter(v => v != null);

    
    if(validator_res.length > 0)
    {
      return new CreateResponseFail(validator_res);
    }
    
    createUser.save();
    if(await this.FindOne(createUser.userName) != null)
    {
      return new CreateResponseSuccess();      
    }
    
    return new CreateResponseError();    
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

