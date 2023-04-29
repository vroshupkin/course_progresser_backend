import { BadRequestException, Injectable } from '@nestjs/common';
import { ExistInObjValidator,  ValidatorError, Validators } from 'src/common/validator_error';
import { validateDocument } from 'src/common/validators';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { SignInRequest, SignInResponse,  TSignIn } from './auth.dto';
import { ErrorResponse, ResponseValidatorError } from 'src/common/common.types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService
{
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) 
  {}

  async signIn(dto: SignInRequest)
  {
    
    const is_not_undefiend_validators = {
      password: dto.password ?? 'Пароль должен быть передан' ,
      userName: dto.userName ?? 'Имя пользователя должно быть передано'
    };

    if(Object.entries(is_not_undefiend_validators).filter(v => v == undefined).length > 0)
    {
      throw new BadRequestException(is_not_undefiend_validators);
    }


    const user = await this.userService.FindOne(dto.userName);
    if(user == null || user.password != dto.password)
    {
      throw new BadRequestException({ message: 'Неверно задан логин/пароль' });
    }
    
    
    const payload = { userName: user.userName, sub: user._id };
    const token = 
    {
      access_token: await this.jwtService.signAsync(payload)
    };

    return new SignInResponse.Success.Success(token);

    
  }
}