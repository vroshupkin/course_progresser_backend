type TInequalityOperator = '>' | '<' | '>=' | '<=' | '=='

type InequalityOperators = {
    [s in TInequalityOperator]: ((a: number, b: number) => boolean);
};


export const FormatingFactory = 
 (token: string)  => (adding_string: string | number) => (str: string) => 
 {
   const find_ind = str.indexOf(token);
   if(find_ind != -1)
   {
     return str.slice(0, find_ind) + adding_string + str.slice(find_ind + token.length, str.length);
   }

   return str;
 };


export const InEqValidator = 
  (expect: number) => (operator: TInequalityOperator) => (toBe: number) => (message: string) => 
  {
    const binary_validator = InequalityOperatorSelector(operator);
    
    if(binary_validator(expect, toBe))
    {
      return '';    
    }

    return FormatingFactory('{$}')(toBe + '')(message); 
  };


const InequalityOperatorSelector = (operator: TInequalityOperator) => 
{
  const operators: InequalityOperators = {
    '>': (a: number, b: number) => a > b,
    '<': (a: number, b: number) => a < b,
    '>=': (a: number, b: number) => a >= b,
    '<=': (a: number, b: number) => a <= b,
    '==': (a: number, b: number) => a == b,
  };

  return operators[operator]; 

}; 


