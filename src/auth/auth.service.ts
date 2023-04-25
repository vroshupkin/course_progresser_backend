import { Injectable } from '@nestjs/common';
import { ExistInObjValidator,  ValidatorError, Validators } from 'src/common/validator_error';
import { validateDocument } from 'src/common/validators';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { SignInRequest, SignInResponse,  TSignIn } from './auth.dto';
import { ErrorResponse, ResponseValidatorError } from 'src/common/common.types';

@Injectable()
export class AuthService
{
  constructor(private userService: UsersService) 
  {}

  async signIn(dto: SignInRequest): Promise<TSignIn.Response.Success | TSignIn.Response.Error> 
  {
  
    const is_not_undefiend_validators = 
    [
      Validators.IsNotUndefiend(dto.userName)('userName не должен быть равен undefiend'),
      Validators.IsNotUndefiend(dto.password)('password должен существовать')
    ].filter(v => v != null);

    if(is_not_undefiend_validators.length > 0)
    {
      return new SignInResponse.Error.ValidatorsError(is_not_undefiend_validators);
    }

    const user = await this.userService.FindOne(dto.userName);
    
    const user_not_validators = 
    [
      Validators.IsNotNull(user)(`Пользователь с именем ${dto.userName} не найден`)
    ].filter(v => v != null);

    return user_not_validators.length > 0? 
      new SignInResponse.Error.ValidatorsError(user_not_validators):
      new SignInResponse.Success.Success(user.userName);

    
  }
}