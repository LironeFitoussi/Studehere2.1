import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceRecordsController } from './attendance-records.controller';
import { AttendanceRecordsService } from './attendance-records.service';

describe('AttendanceRecordsController', () => {
  let controller: AttendanceRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendanceRecordsController],
      providers: [AttendanceRecordsService],
    }).compile();

    controller = module.get<AttendanceRecordsController>(AttendanceRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
