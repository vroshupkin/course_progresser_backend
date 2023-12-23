import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import test from 'ava';


let service: CatsService;
let module_ref: TestingModule; 

test.beforeEach(async () => 
{
  module_ref = await Test.createTestingModule({
    providers: [ CatsService ],
  }).compile();

  service =  module_ref.get<CatsService>(CatsService);
});

test('CatsService: should be defined', (t) => 
{
    
  t.true(service !== undefined && service !== null);
});

test.afterEach(() =>  module_ref.close());


