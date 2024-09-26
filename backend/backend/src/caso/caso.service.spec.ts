import { Test, TestingModule } from '@nestjs/testing';
import { CasoService } from './caso.service';

describe('CasoService', () => {
  let service: CasoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasoService],
    }).compile();

    service = module.get<CasoService>(CasoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
