import { ValidatorError } from './validator_error';

// Общие типы для typescript
export type N_aryOperator<Args extends any[], Res> = (...args: Args) => Res
export type TFromKey<T> = T[keyof T]

export type ResponseStatus = 'success' | 'error'

export abstract class SuccessResponse
{
  status: ResponseStatus = 'success';
}

export abstract class ErrorResponse 
{
  status: ResponseStatus = 'error';
}

export abstract class ResponseValidatorError extends ErrorResponse
{
  constructor(public validators: ValidatorError[])
  {
    super();
  }
}

