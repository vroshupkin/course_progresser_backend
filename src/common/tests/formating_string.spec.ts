import { FormatingFactory } from '../../common/validators';
import test from 'ava';


test('FormatingFactory()', (t) => 
{
  const res = FormatingFactory('{$}')('1 million ')('I will have {$}$');
    
  t.true(res === 'I will have 1 million $');

});
