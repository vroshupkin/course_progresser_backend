import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ErrorResponse, N_aryOperator, ResponseStatus } from 'src/common/common.types';
import { ValidatorError } from 'src/common/validator_error';


export class CreateRequest
{
  @ApiProperty({ description: 'Имя пользователя' })
    userName: string;
  @ApiProperty({ description: 'Пароль' })
    password: string;
  @ApiPropertyOptional({ description: 'Имя' })
    firstName?: string;
  @ApiPropertyOptional({ description: 'Фамилия' })
    lastName?: string;

}

export class UpdateUserDto
{
  @ApiProperty({ description: 'Имя пользователя' })
    userName: string;
  @ApiPropertyOptional({ description: 'Имя' })
    firstName?: string;
  @ApiPropertyOptional({ description: 'Фамилия' })
    lastName?: string;

}


export class CreateResponseSuccess
{ 
  
  response_status: ResponseStatus = 'success';
  constructor(
  
  )
  {
  
  }
}

export class CreateResponseFail extends ErrorResponse
{
  response_status: ResponseStatus = 'error';
  constructor(
    public validators: ValidatorError[]
  )
  {
    super();
  }
}


export class CreateResponseError extends ErrorResponse
{
  constructor()
  {
    super();
  }
}

export class CreateResponseErrorUserExist extends ErrorResponse
{
  message: string;
  constructor()
  {

    super();
    this.message = 'Такой пользователь уже существует';
  }
}


export class ResponseGetUser
{ 
  @ApiProperty({ description: 'Имя пользователя' })
    userName: string;  
  @ApiProperty({ description: 'Имя' })
    firstName: string;
  @ApiProperty({ description: 'Фамилия' })
    lastName: string;
}