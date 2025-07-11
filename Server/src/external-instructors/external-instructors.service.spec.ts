import { Test, TestingModule } from '@nestjs/testing';
import { ExternalInstructorsService } from './external-instructors.service';

describe('ExternalInstructorsService', () => {
  let service: ExternalInstructorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalInstructorsService],
    }).compile();

    service = module.get<ExternalInstructorsService>(ExternalInstructorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
