import { BadRequestException, Injectable } from '@nestjs/common';
import { ExistInObjValidator,  ValidatorError, Validators } from 'src/common/validator_error';
import { validateDocument } from 'src/common/validators';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { RefreshTokenDto, SignInRequest, SignInResponse,  TSignIn } from './auth.dto';
import { ErrorResponse, ResponseValidatorError } from 'src/common/common.types';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/users/user.dto';
import { BadRequestError } from 'passport-headerapikey';

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

    const error_message = {
      login_error: dto.userName.length == 0 || !dto.userName? 'Имя пользователя должно быть передано' : '',
      password_error: dto.password.length == 0 || !dto.password? 'Пароль должен быть передан' : ''
    };
    
    if(error_message.login_error.length > 0 || error_message.password_error.length > 0)
    {
      throw new BadRequestError(error_message);
    }
    
    const user = await this.userService.FindOne(dto.userName);


    if(user == null)
    {
      throw new BadRequestError({ login_error: 'Неверно задан логин' });
    }

    if(user.password != dto.password)
    {
      throw new BadRequestError({ password_error: 'Неверно задан пароль' });
    }
    
    
    const payload = { userName: user.userName, sub: user._id };
    
    const token = 
    {
      access_token: await this.jwtService.signAsync(payload),
      
    };

    // TODO Попробовать без сохраненич а бд рефреш токена 
    user.refreshToken = token.access_token;
    user.save();
    
    return token; 
  }

  async refresh(dto: RefreshTokenDto)
  {
    const user = await this.userService.FindOne(dto.userName);
    if(user == null)
    {
      throw new BadRequestError({ message: 'Пользователь не найден' });
    }
    if(user.refreshToken != dto.refreshToken)
    {
      throw new BadRequestError({ message: 'Не совпадают токены' });
    }

    const payload = { userName: user.userName, sub: user._id };
    
    const token = 
    {
      access_token: await this.jwtService.signAsync(payload)
    };
    
    
    user.refreshToken = token.access_token;
    user.save();

    return token;

  }
}