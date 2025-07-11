import { Test, TestingModule } from '@nestjs/testing';
import { ExternalInstructorsController } from './external-instructors.controller';
import { ExternalInstructorsService } from './external-instructors.service';

describe('ExternalInstructorsController', () => {
  let controller: ExternalInstructorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalInstructorsController],
      providers: [ExternalInstructorsService],
    }).compile();

    controller = module.get<ExternalInstructorsController>(ExternalInstructorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
