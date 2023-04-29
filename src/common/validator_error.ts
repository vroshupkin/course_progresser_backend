import { N_aryOperator } from './common.types';


export interface ValidatorError{
    validationType: string,
    message: string,
}

const ErrorValidatorFactory = <Args extends any[]>
  (handler: N_aryOperator<Args, boolean>) => 
    (...args: Args) =>
      (message: string): ValidatorError | null =>
      {
        if(!handler(...args))
        {
          return {
            validationType: handler.name,
            message: message
          };
        }
        
        return null;
      };

const existInObj = (obj: {[s: string | number]: any}, key: string | number) =>  obj?.[key] !== undefined;
const greater_than = (a: number, b: number) => a > b;
const less_than = (a: number, b: number) => a < b;
const IsNotUndefiend = (a: any) => a != undefined;
const IsNotNull = ((a: any) => a != null);
const IsEqual = ((a: any, b: any) => a == b);
const IsNotEqual = ((a: any, b: any) => a != b);

export const Validators = 
{
  IsNotNull: ErrorValidatorFactory(IsNotNull),
  IsNotUndefiend: ErrorValidatorFactory(IsNotUndefiend),
  IsEqual: ErrorValidatorFactory(IsEqual),
  IsNotEqual: ErrorValidatorFactory(IsNotEqual),
  
};


export const LessThanValidator  = ErrorValidatorFactory(less_than);
export const GreaterThanValidator  = ErrorValidatorFactory(greater_than);
export const ExistInObjValidator  = ErrorValidatorFactory(existInObj);
export const NotUndefiendValidator  = ErrorValidatorFactory(IsNotUndefiend);


