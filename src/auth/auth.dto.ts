import { ErrorResponses, ResponseStatus, ResponseValidatorError, SuccessResponse } from 'src/common/common.types';
import { ValidatorError } from 'src/common/validator_error';
import { TFromKey } from 'src/common/common.types';

export class SignInRequest
{
  userName: string;
  password: string;
}


class Success extends SuccessResponse
{
  message: string;
  constructor(public userName: string)
  {
    super();
    this.message = 'Вход в систему';
  }
  
}

class ResponseError extends ErrorResponses
{
  constructor()
  {
    super();
  }
}

class NotFoundUser extends ErrorResponses
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


// export type TSignInResponseError_needed = ResponseError | ValidatorsError | NotFoundUser

// type TSignInResponse_keys = keyof typeof SignInResponse.Error
// export type TSignInResponseError = typeof SignInResponse.Error[TSignInResponse_keys]


// type _TSignInClasses = TFromKey<typeof SignInResponse.Success>
// export type TSignInResponseSuccess = InstanceType<_TSignInClasses>

// type _TSignInTypesError = TFromKey<typeof SignInResponse.Error>
// export type TSignInResponseError = InstanceType<_TSignInTypesError>

export namespace TSignIn
{
  export namespace Response
  {
    export type Success = InstanceType<TFromKey<typeof SignInResponse.Success>>
    export type Error = InstanceType<TFromKey<typeof SignInResponse.Error>>
  }

  export namespace Request
  {

  }
  
}


