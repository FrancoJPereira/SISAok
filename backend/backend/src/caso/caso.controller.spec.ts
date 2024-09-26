import { Test, TestingModule } from '@nestjs/testing';
import { CasoController } from './caso.controller';

describe('CasoController', () => {
  let controller: CasoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasoController],
    }).compile();

    controller = module.get<CasoController>(CasoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
