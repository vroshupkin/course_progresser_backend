// interface Iterable<T>{
//   [Symbol.iterator](): {
//     next(): {
//       value: T,
//       done: boolean
//     }
//   }
// }
type TIterableReturn<T> = {
  value: T,
  done: boolean,
}
abstract class Iterable<T>
{ 
  abstract next(): TIterableReturn<T>
}

export class TwoArrayIterationProtocol<T1, T2> implements Iterable<[T1, T2]>
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
    
    const value: [T1, T2] = [ arr1[i], arr2[i] ];

    return{
      value,
      done: i >= this.len            
    };
  }

}
/**
 * @example 
 * equlity_set(new Set(['a']), new Set(['a'])) => true
 * equlity_set(new Set(['a']), new Set(['b'])) => false
 */
function equlity_set(s1: Set<any>, s2: Set<any>)
{
  if(s1.values.length != s2.values.length){return false;}
  
  for (const key_1 of s1) 
  {
    if(!s2.has(key_1)){return false;}
  }

  return true;
}


export class ExtendSet<T> extends Set<T>
{
  equal = (s2: Set<T> | ExtendSet<T>) => equlity_set(this, s2);
  notEqual = (s2: Set<T> | ExtendSet<T>) => !equlity_set(this, s2); 
}


