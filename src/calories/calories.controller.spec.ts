import { Test, TestingModule } from '@nestjs/testing';
import { CaloriesController } from './calories.controller';
import test from 'ava';


let controller: CaloriesController;
let module_ref: TestingModule;

test.beforeEach(async () => 
{
  module_ref  = await Test.createTestingModule({
    controllers: [ CaloriesController ],
  }).compile();

  controller = module_ref.get<CaloriesController>(CaloriesController);
});

test('should be defined', (t) => 
{
  t.true(controller !== undefined);
});

test.afterEach(() => module_ref.close());


