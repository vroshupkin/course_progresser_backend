import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ErrorResponse, N_aryOperator, ResponseStatus } from '../common/common.types';
import { ValidatorError } from '../common/validator_error';


export class CreateDto
{
  @ApiProperty({ example: 'user_1' })
    userName: string;
  @ApiProperty({ example: 'user_password' })
    password: string;
  @ApiPropertyOptional({ example: 'Richard' })
    firstName?: string;
  @ApiPropertyOptional({ example: 'Smith' })
    lastName?: string;
  
}

// export class GetUserDto
// {
//   @ApiProperty({ example: 'admin' })
//     userName: string;
// }


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

export class GetUserDto
{
  @ApiProperty({ example: 'admin' })
    userName: string;  
}

export class GetUserResponseDto
{ 
  @ApiProperty({ description: 'Имя пользователя' })
    userName: string;  
  @ApiProperty({ description: 'Имя' })
    firstName: string;
  @ApiProperty({ description: 'Фамилия' })
    lastName: string;
}

export class DeleteDto
{
  @ApiProperty({ description: 'Имя пользователя' })
    userName: string;  
}