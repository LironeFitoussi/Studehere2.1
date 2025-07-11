import { Test, TestingModule } from '@nestjs/testing';
import { PrincipalsController } from './principals.controller';
import { PrincipalsService } from './principals.service';

describe('PrincipalsController', () => {
  let controller: PrincipalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrincipalsController],
      providers: [PrincipalsService],
    }).compile();

    controller = module.get<PrincipalsController>(PrincipalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
