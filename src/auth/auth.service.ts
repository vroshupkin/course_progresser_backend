import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BadRequestError } from 'passport-headerapikey';
import { UsersService } from '../users/users.service';
import { RefreshTokenDto, SignInRequest } from './auth.dto';

@Injectable()
export class AuthService
{
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) 
  {}


  async signIn(data: SignInRequest)
  {

    const error_message = {
      login_error: !data.username.length || !data.username? 'Имя пользователя должно быть передано' : '',
      password_error: !data.password.length || !data.password? 'Пароль должен быть передан' : ''
    };
    
    if(error_message.login_error.length || error_message.password_error.length )
    {
      throw new BadRequestError(error_message);
    }
    
    // const user = await this.userService.FindOne(data.userName);

    const { username, password, id } = await this.userService.getUser(data.username);

    if(username == null)
    {
      throw new BadRequestError({ login_error: 'Неверно задан логин' });
    }

    if(password != data.password)
    {
      throw new BadRequestError({ password_error: 'Неверно задан пароль' });
    }
    
    
    const payload = { username, sub: id };
    
    const token = await this.jwtService.signAsync(payload);

    // TODO Попробовать без сохранения а бд рефреш токена 
    
    this.userService.saveToken(id, JSON.stringify(token));

    return token; 
  }

  // TODO сделать рефреш токен
  async refresh(dto: RefreshTokenDto)
  {

    return true;

    // const user = await this.userService.getUser(dto.userName);
    // if(user == null)
    // {
    //   throw new BadRequestError({ message: 'Пользователь не найден' });
    // }
    // if(user.refreshToken != dto.refreshToken)
    // {
    //   throw new BadRequestError({ message: 'Не совпадают токены' });
    // }

    // const payload = { userName: user.userName, sub: user._id };
    
    // const token = 
    // {
    //   access_token: await this.jwtService.signAsync(payload)
    // };
    
    
    // user.refreshToken = token.access_token;
    // user.save();

    // return token;

  }
}