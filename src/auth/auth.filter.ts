import { ExceptionFilter, Catch, ArgumentsHost, HttpException, ForbiddenException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { BadRequestError } from 'passport-headerapikey';

@Catch(BadRequestError)
export class BadRequestFilter implements ExceptionFilter 
{
  catch(exception: HttpException, host: ArgumentsHost) 
  {    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    response
      .status(HttpStatus.BAD_REQUEST)
      .json(
        exception.message
      ).send();

    
  }
}

