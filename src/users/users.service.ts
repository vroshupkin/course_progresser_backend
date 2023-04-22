import { Model, Document } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { UserDtoAdd } from './user.dto';
import { InEqValidator, validateDocument } from 'src/common/validators';
import { Error } from 'mongoose';


@Injectable()
export class UsersService
{
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  )
  {
    
  }

  async create(dto: UserDtoAdd) 
  {
    const createUser = new this.userModel(dto);

    const schemaValidate = await validateDocument(createUser);
    if(schemaValidate.length > 0)
    {
      return schemaValidate;
    }

    const pass_len = createUser.password.length;
    const validator_res = 
    [ 
      InEqValidator(pass_len)('>')(8)('Пароль должен быть больше {$} символов'),
      InEqValidator(pass_len)('<')(32)('Пароль должен быть меньше {$} символов'),
      
    ]
      .reduce((prev, curr) => prev + curr + '\n');

    return validator_res;    
  }

  async findAll() 
  {
    return this.userModel.find().exec();
  }


  async findOne(userName: string) 
  {
    return this.userModel.find({ userName }).exec();
  }

  
}

