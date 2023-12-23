import { Test, TestingModule } from '@nestjs/testing';
import { TimersService } from './timers.service';
import test from 'ava';

let service: TimersService;
let module_ref: TestingModule;

test.beforeEach(async () => 
{
  module_ref = await Test.createTestingModule({
    providers: [ TimersService ],
  }).compile();

  service = module_ref.get(TimersService);
});

  
test('TimersService', (t) => 
{
  t.true(service !== undefined && service !== null);
});

