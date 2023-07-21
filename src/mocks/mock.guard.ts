import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class MockAuthGuard implements CanActivate 
{
  constructor() {}

  async canActivate()
  {
    return true;
  }
}