import { InEqValidator } from '../../common/validators';

describe('Validators', () => 
{

  test('GreaterThan(5)', () => 
  {

    const str = 'hello';

    const message = `Сообщение: ${str} должно быть меньше < {$}`;

    const res = InEqValidator(str.length)('<')(5)(message);
    
    expect(res).toBe(`Сообщение: ${str} должно быть меньше < 5`);


  });

});