import { Test, TestingModule } from '@nestjs/testing';
import { TimersController } from './timers.controller';
import test from 'ava';


let controller: TimersController;
let module_ref: TestingModule;

test.before(async () => 
{
  module_ref  = await Test.createTestingModule({
    controllers: [ TimersController ],
  }).compile();

  
  controller = module_ref.get(TimersController);
});

test('should be defined', (t) => 
{
  t.true(controller !== undefined);
});


test.after(() => module_ref.close());