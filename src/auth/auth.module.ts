import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './api-key.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [ 
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' }
    })
  ],
  providers: [ AuthService, ApiKeyStrategy ],
  controllers: [ AuthController ],
  exports: [ AuthService ]
})
export class AuthModule {}
