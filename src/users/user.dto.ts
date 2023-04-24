import { ErrorResponses, N_aryOperator, ResponseStatus } from 'src/common/common.types';
import { ValidatorError } from 'src/common/validator_error';

export class UserDtoAdd
{
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
}


export class CreateRequest
{
  userName: string;
  password: string;
  firstName?: string;
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


export class CreateResponseError extends ErrorResponses
{
  constructor()
  {
    super();
  }
}

export class CreateResponseErrorUserExist extends ErrorResponses
{
  message: string;
  constructor()
  {

    super();
    this.message = 'Такой пользователь уже существует';
  }
}