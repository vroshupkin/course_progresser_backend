import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ErrorResponse, N_aryOperator, ResponseStatus } from 'src/common/common.types';
import { ValidatorError } from 'src/common/validator_error';


export class CreateRequest
{
  @ApiProperty()
    userName: string;
  @ApiProperty()
    password: string;
  @ApiPropertyOptional()
    firstName?: string;
  @ApiPropertyOptional()
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

export class CreateResponseFail
{
  response_status: ResponseStatus = 'error';
  constructor(
    public validators: ValidatorError[]
  )
  {
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