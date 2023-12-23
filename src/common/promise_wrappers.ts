

type TOptionsPromiseWithTimer = {
    silent?: boolean,
    err_message?: string,
    max_ms?: number

}
/**
 * Если промис не успевает отработать за max_ms, то выдаёт ошибку
 * @param promise_fn 
 * @param options 
 */
export const promise_with_timer = async <T>(promise_fn: () => Promise<T>, options?: TOptionsPromiseWithTimer) => 
{
  const max_ms = options?.max_ms ?? 5000;

  
  // eslint-disable-next-line prefer-const
  let i = 0;
  
  let promise_res;

  await new Promise((resolve, reject) => 
  {
    
    
    // console.log(promise_res);
    // eslint-disable-next-line prefer-const
    let timer_id: NodeJS.Timer;
    
    const interval_handler = () => 
    {
      console.log(`Прошло ${i} секунд`);
     
      i++;

      promise_fn().then(res => 
      {
        promise_res = res;
      });
      
      
      if(1000 * i > max_ms )
      {
        const message = options?.err_message ?? `Промис не успел отработать за: ${max_ms / 1000} секунд`;
        const err =  new Error(message);
        err.name = 'Out of time';
        reject(err);
        clearInterval(timer_id);
      
      }
      else if(promise_res)
      {
        resolve(promise_res);
        clearInterval(timer_id);
      }
    };


    timer_id = setInterval(interval_handler,  1000);
 

  });

  
};