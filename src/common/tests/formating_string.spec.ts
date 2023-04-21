import { FormatingFactory } from '../../common/validators';


describe('FormatingFactory()', () => 
{

  const Formating = FormatingFactory('{$}');
  test('I will have 1 million $', () => 
  {
    const res = Formating('1 million ')('I will have {$}$');
    
    expect(res).toBe('I will have 1 million $');
  });
});