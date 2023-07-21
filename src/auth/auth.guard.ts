import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/users.service';
import { Observable } from 'rxjs';
import { config } from '../config';

@Injectable()
export class AdminGuard implements CanActivate 
{
  constructor(private usersService: UsersService, private jwtService: JwtService)
  {

  }

  async canActivate(context: ExecutionContext): Promise<boolean> 
  {
       
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    
    if (!token) 
    {
      throw new UnauthorizedException();
    }
    try 
    {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: config.jwt_secret
        }
      );
        

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    }
    catch 
    {
      throw new UnauthorizedException();
    }
    

    const role = await this.usersService.GetRole(request['user']['userName']);

    if(role !== 'admin')
    {
      throw new UnauthorizedException('Только админы могут удалять пользователей');
    }

    return true;
  }
}

@Injectable()
export class AuthGuard implements CanActivate 
{
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> 
  {

    const isPublic = this.reflector.getAllAndOverride<boolean>
    (IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if(isPublic)
    {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    if (!token) 
    {
      throw new UnauthorizedException();
    }
    try 
    {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: config.jwt_secret
        }
      );

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    }
    catch(e)
    {

      throw new UnauthorizedException();
    }
    
    
    return true;
  }

}

function extractTokenFromHeader(request: Request): string | undefined 
{
  const [ type, token ] = request.headers?.authorization?.split(' ') ?? [];
    
  return type === 'Bearer' ? token : undefined;
}