
export class TwoArrayIterationProtocol<T1, T2>
{
  private i = 0;
  private len: number;
  constructor(private arr1: T1[], private arr2: T2[])
  {
    const [ l1, l2 ] = [ arr1.length, arr2.length ];
    this.len = l1 < l2 ? l1 : l2;
  }

  [Symbol.iterator]()
  {
    return this;
  }

  next()
  {
    const { i, arr1, arr2 } = this;
    
    this.i++;
    
    return{
      value: [ arr1[i], arr2[i] ],
      done: i >= this.len            
    };
  }

}

// const proxy = new Proxy(obj, {
//   get(target, p)
//   {
//     return [ target.arr_1[p] ];
//   }
// });

function equlity_set(s1: Set<any>, s2: Set<any>)
{
  if(s1.values.length != s2.values.length){return false;}
  
  for (const key_1 of s1) 
  {
    if(!s2.has(key_1)){return false;}
  }

  return true;
}

export function SetOperation(s1: Set<any>, op: '==', s2: Set<any>)
{
  if(op == '==')
  {
    return equlity_set(s1, s2);
  }
}
