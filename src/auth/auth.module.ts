import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './api-key.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard, AuthGuard } from './auth.guard';
import { config } from '../config';

@Module({
  imports: [ 
    UsersModule,
    JwtModule.register({
      global: true,
      secret: config.jwt_secret,
      signOptions: { expiresIn: '45m' }
    })
  ],
  providers: [ 
    AuthService,
    ApiKeyStrategy,
    AuthGuard,
    AdminGuard
  ],
  controllers: [ AuthController ],
  exports: [
    AuthService,
    AdminGuard
  ]
})
export class AuthModule {}
