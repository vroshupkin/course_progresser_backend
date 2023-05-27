import mongoose, { Model, Document } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { CreateDto,  UpdateUserDto } from './user.dto';
import { validateDocument } from 'src/common/validators';


@Injectable()
export class UsersService
{
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  )
  {
      
  }

  async Create(request: CreateDto) 
  {
    const isUserFind = await this.FindOne(request.userName) != null;

    if(isUserFind)
    {
      throw new BadRequestException('Пользователь с таким именем уже существует');
    }


    const createUser = new this.userModel(request);
    createUser.role = 'user';
    
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
    
    console.log(userName);
    
    return  res;
  }

  async Update(updateUserDto: UpdateUserDto): Promise<any>
  {
    const res = this.userModel.updateOne({ userName: updateUserDto.userName }, updateUserDto);
    
    return res;
  }

  async Delete(userName: string)
  {
    const res = this.userModel.deleteOne({ userName });
    
    return res;
  }

  async GetRole(userName: string)
  {
    const res = await this.userModel.findOne({ userName });

    if(res == null)
    {
      return null;
    }
    
    return res.role;
  }
  
  
}

