import { InEqValidator } from '../../common/validators';
import  test from 'ava';


test('GreaterThan(5)', (t) => 
{

  const str = 'hello';

  const message = `Сообщение: ${str} должно быть меньше < {$}`;

  const res = InEqValidator(str.length)('<')(5)(message);
    

  t.true(res === `Сообщение: ${str} должно быть меньше < 5`);


});
