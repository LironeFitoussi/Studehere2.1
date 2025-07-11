import { Test, TestingModule } from '@nestjs/testing';
import { DailyAttendancesController } from './daily-attendances.controller';
import { DailyAttendancesService } from './daily-attendances.service';

describe('DailyAttendancesController', () => {
  let controller: DailyAttendancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyAttendancesController],
      providers: [DailyAttendancesService],
    }).compile();

    controller = module.get<DailyAttendancesController>(DailyAttendancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
