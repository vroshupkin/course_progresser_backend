import { ErrorResponse, ResponseStatus, ResponseValidatorError, SuccessRespons as SuccessResponse } from 'src/common/common.types';
import { ValidatorError } from 'src/common/validator_error';
import { TFromKey } from 'src/common/common.types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SignInRequest
{
  @ApiProperty({ example: 'admin' })
    userName: string;
  @ApiProperty({ example: 'admin admin' })
    password: string;
}


// TODO Избавиться от логики success 
class Success extends SuccessResponse
{
  message: string;
  constructor(public user: any)
  {
    super();
    this.message = 'Вход в систему';
  }
  
}

class ResponseError extends ErrorResponse
{
  constructor()
  {
    super();
  }
}

class NotFoundUser extends ErrorResponse
{
  constructor(public userName: string)
  {
    super();
  }
}

class ValidatorsError extends ResponseValidatorError
{
  constructor(public validators: ValidatorError[])
  {
    super(validators);
  }
}

export const SignInResponse = 
{
  Success: {
    Success: Success,
  },


  Error: {
    Error: ResponseError,
    ValidatorsError: ValidatorsError,
    NotFoundUser: NotFoundUser, 
  }
};


export namespace TSignIn
{
  export namespace Response
  {
    export type Success = InstanceType<TFromKey<typeof SignInResponse.Success>>
    export type Error = InstanceType<TFromKey<typeof SignInResponse.Error>>
  }

  export type Request = SignInRequest;
}


export class RefreshTokenDto
{
  @ApiProperty({ description: 'Имя пользователя' })
    userName: string;
  @ApiProperty({ description: 'Обновление токена' })
    refreshToken: string;
}

