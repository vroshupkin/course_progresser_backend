import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { UserDtoAdd } from './user.dto';
import { InEqValidator } from 'src/common/validators';

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
    const createUser = new this.userModel(dto);
    
    const pass_len = createUser.password.length;
    const validator_res = 
    [ 
      InEqValidator(pass_len)('>')(8)('Пароль должен быть больше {$} символов'),
      InEqValidator(pass_len)('<')(32)('Пароль должен быть меньше {$} символов'),
    ]
      .reduce((prev, curr) => prev + curr);

    return validator_res;    
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
