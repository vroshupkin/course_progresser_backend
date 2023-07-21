import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { config } from '../config';


@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') 
{
  
  constructor() 
  {
    super({ header: 'X-API-KEY', prefix: '' }, 
      true, 
      async (apiKey, done) => this.validate(apiKey, done)
    );
  }

  public validate = (incomingApiKey: string, done: (error: Error, data) => Record<string, unknown>) => 
  {
    const configApiKey = config.API_KEY;

    if (configApiKey === incomingApiKey) 
    {
      done(null, true);
    }

    done(new UnauthorizedException(), null);
  };
}


