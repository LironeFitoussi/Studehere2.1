import { Test, TestingModule } from '@nestjs/testing';
import { DailyAttendancesService } from './daily-attendances.service';

describe('DailyAttendancesService', () => {
  let service: DailyAttendancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyAttendancesService],
    }).compile();

    service = module.get<DailyAttendancesService>(DailyAttendancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
